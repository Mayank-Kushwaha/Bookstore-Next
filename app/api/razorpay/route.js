import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { nanoid } from "nanoid";

const keyId = process.env.RAZORPAY_API_KEY;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req) {
  if (!keyId || !keySecret) {
    return NextResponse.json(
      {
        message:
          "Razorpay is not configured. Set RAZORPAY_API_KEY and RAZORPAY_KEY_SECRET environment variables.",
      },
      { status: 500 }
    );
  }

  try {
    const { total } = await req.json();
    const amount = Number(total);
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid order total." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const response = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: nanoid(),
      payment_capture: 1,
    });

    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      keyId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while creating the Razorpay order.",
        error: error.message,
      },
      { status: 400 }
    );
  }
}
