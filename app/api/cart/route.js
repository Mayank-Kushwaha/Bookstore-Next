import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, phone, address, payment, items, total } =
      await req.json();
    await connectMongoDB();
    await Cart.create({ name, email, phone, address, payment, items, total });
    console.log(items);

    return NextResponse.json(
      { message: "cart data saved succesfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while saving the data from cart" },
      { status: 500 }
    );
  }
}
