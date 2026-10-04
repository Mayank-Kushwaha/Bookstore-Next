import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import { connectMongoDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const {
      name,
      email,
      phone,
      address,
      payment,
      items,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    await connectMongoDB();

    // Verify the Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: "fail" },
        { status: 400 }
      );
    }

    // Confirm the amount actually paid matches the amount of the order that
    // Razorpay created. Never trust the client-supplied total: fetch both the
    // order and the payment straight from Razorpay and compare them.
    const keyId = process.env.RAZORPAY_API_KEY;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { message: "Razorpay is not configured." },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    let order;
    let capturedPayment;
    try {
      order = await razorpay.orders.fetch(razorpay_order_id);
      capturedPayment = await razorpay.payments.fetch(razorpay_payment_id);
    } catch (fetchError) {
      return NextResponse.json(
        {
          message: "Could not verify the order with Razorpay.",
          error: fetchError.message,
        },
        { status: 400 }
      );
    }

    // Amounts from Razorpay are in paise. The payment must belong to this
    // order and the amount paid must match the order amount exactly.
    const orderAmount = Number(order?.amount);
    const amountPaid = Number(capturedPayment?.amount);

    if (
      capturedPayment?.order_id !== razorpay_order_id ||
      !Number.isFinite(orderAmount) ||
      !Number.isFinite(amountPaid) ||
      amountPaid !== orderAmount
    ) {
      return NextResponse.json(
        { message: "Paid amount does not match the order amount." },
        { status: 400 }
      );
    }

    // Get the user ID from the authorization token
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header is missing or invalid' },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split('Bearer ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Use the amount Razorpay reports (in rupees) rather than the client total.
    const verifiedTotal = orderAmount / 100;

    // Upsert keyed on the Razorpay identifiers so that replaying the callback
    // updates the existing record instead of inserting a duplicate.
    const paymentRecord = await Payment.findOneAndUpdate(
      { razorpay_order_id, razorpay_payment_id },
      {
        $setOnInsert: {
          user: userId,
          name,
          email,
          phone,
          address,
          payment,
          items,
          total: verifiedTotal,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(
      { message: "success", paymentId: paymentRecord._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while payment verification.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();

    // Get the user ID from the authorization token
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header is missing or invalid' },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split('Bearer ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the Payment records for this user
    const payments = await Payment.find({ user: userId });

    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while fetching payment records.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}