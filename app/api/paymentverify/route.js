import { NextResponse } from "next/server";
import crypto from "crypto";
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
      total,
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

    const paymentRecord = await Payment.create({
      user: userId,
      name,
      email,
      phone,
      address,
      payment,
      items,
      total,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

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