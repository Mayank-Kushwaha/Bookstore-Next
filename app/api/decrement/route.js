import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function PUT(req) {
  try {
    await connectMongoDB();
    const { productId } = await req.json();
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header is missing or invalid' },
        { status: 401 }
      );
    }
    const token = authorizationHeader.split('Bearer ')[1];

    // Now, you can access the userId from the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;


    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json(
        { message: 'Cart not found for the user' },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      // If the item exists, decrement its quantity by one
      if(cart.items[itemIndex].quantity > 1){
        cart.items[itemIndex].quantity -= 1;
      }
      
      const updatedTotal = cart.items.reduce((total, item) =>  total + (item.price * item.quantity), 0);

      // Update the 'total' field in the cart document
      cart.total = updatedTotal;

      await cart.save();
    } else {
      return NextResponse.json(
        { message: 'Item not found in the cart' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Item updated from the cart successfully.',
      items: cart.items, // Include updated items in the response
      total: cart.total, // Include the updated total in the response
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while updating the item in the cart.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}