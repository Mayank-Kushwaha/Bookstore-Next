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


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import { nanoid } from 'nanoid'


// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });


// export async function GET() {
//   // const data = await fetch("http://localhost:3000/api/cart");
//   // const cart = await data.json();
//   // console.log(cart)
  
//     const payment_capture = 1;
//     const amount = 100 * 100 // amount in paisa. In our case it's INR 1
//     const currency = "INR";
//     const options = {
//         amount: (amount).toString(),
//         currency,
//         receipt: nanoid(),
//         payment_capture,
//         notes: {
//             // These notes will be added to your transaction. So you can search it within their dashboard.
//             // Also, it's included in webhooks as well. So you can automate it.
//             paymentFor: "testingDemo",
//             userId: "100",
//             productId: 'P100'
//         }
//     };

//    const order = await instance.orders.create(options);
//   return NextResponse.json({ msg: "success",order });
// }


// export async function POST(req) {
//   const body = await req.json();
// console.log("jsonbody razorpayroute",body);

//   return NextResponse.json({ msg: body });
// }
