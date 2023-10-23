import { connectMongoDB } from "@/lib/mongodb";
import Wishlist from "@/models/wishlist";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(req) {
  try {
    const { items } = await req.json();
    await connectMongoDB();
   // Extract the userId from the Authorization header
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

   // Continue with the rest of your code, using userId as needed
   const wishlist = await Wishlist.findOne({ user: userId }); // Find the wishlist for the current user
    if (!wishlist) {
      // If the wishlist doesn't exist, create a new one
      await wishlist.create({ user: userId});
    } else {
        // If the cart exists, update its items and total
        wishlist.items = items;
      
        await wishlist.save();
      }
      console.log(items);
 

    return NextResponse.json(
      { message: "wishlist data saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while saving the data from wishlist",error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    await connectMongoDB();
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

   // Continue with the rest of your code, using userId as needed
   const wishlist = await Wishlist.findOne({ user: userId }).populate("items");;
    // const wishlist = await wishlist.findOne({ user: req.userId }).populate("items");
    if (!wishlist) {
      return NextResponse.json(
        { message: "wishlist not found for the current user.",error: error.message },
        { status: 404 }
      );
    }
    return NextResponse.json(wishlist.items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the wishlist data.",error: error.message},
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
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

    // Remove the item from the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return NextResponse.json(
        { message: 'wishlist not found for the user' },
        { status: 404 }
      );
    }

    // Find the index of the item to remove in the 'items' array
    const itemIndex = wishlist.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      // Remove the item from the 'items' array
      wishlist.items.splice(itemIndex, 1);
     
      await wishlist.save();
    } else {
      return NextResponse.json(
        { message: 'Item not found in the wishlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Item removed from the wishlist successfully.',
      items: wishlist.items, // Include updated items in the response
      total: wishlist.total, // Include the updated total in the response
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while removing the item from the wishlist.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
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


    const wishlist = await wishlist.findOne({ user: userId });

    if (!wishlist) {
      return NextResponse.json(
        { message: 'wishlist not found for the user' },
        { status: 404 }
      );
    }

    const itemIndex = wishlist.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      // If the item exists, increment its quantity by one
      wishlist.items[itemIndex].quantity += 1;


      const updatedTotal = wishlist.items.reduce((total, item) =>  total + (item.price * item.quantity), 0);

      // Update the 'total' field in the wishlist document
      wishlist.total = updatedTotal;

      await wishlist.save();
    } else {
      return NextResponse.json(
        { message: 'Item not found in the wishlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Item updated from the wishlist successfully.',
      items: wishlist.items, // Include updated items in the response
      total: wishlist.total, // Include the updated total in the response
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while updating the item in the wishlist.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

