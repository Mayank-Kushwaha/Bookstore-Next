import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { nanoid } from 'nanoid'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const { total } = await req.json();
  const payment_capture = 1;
  const amount = total;
  const currency = "INR";

  try {
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: nanoid(),
      payment_capture,
    };

    const response = await razorpay.orders.create(options);

    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
   

    // console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while payment processing",
        error: error.message,
      },
      { status: 400 }
      );

  } 
}