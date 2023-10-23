import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(req) {
  try {
    const { items, total } = await req.json();
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
   const cart = await Cart.findOne({ user: userId }); // Find the cart for the current user
    if (!cart) {
      // If the cart doesn't exist, create a new one
      await Cart.create({ user: userId});
    } else {
      // If the cart exists, update its items and total
      cart.items = items;
      cart.total = total;
      await cart.save();
    }
    console.log(items);

    return NextResponse.json(
      { message: "Cart data saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while saving the data from cart",error: error.message },
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
   const cart = await Cart.findOne({ user: userId }).populate("items");;
    // const cart = await Cart.findOne({ user: req.userId }).populate("items");
    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found for the current user.",error: error.message },
        { status: 404 }
      );
    }
    return NextResponse.json(cart.items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the cart data.",error: error.message},
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

    // Remove the item from the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json(
        { message: 'Cart not found for the user' },
        { status: 404 }
      );
    }

    // Find the index of the item to remove in the 'items' array
    const itemIndex = cart.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      // Remove the item from the 'items' array
      cart.items.splice(itemIndex, 1);
      const updatedTotal = cart.items.reduce((total, item) => total + item.price, 0);

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
      message: 'Item removed from the cart successfully.',
      items: cart.items, // Include updated items in the response
      total: cart.total, // Include the updated total in the response
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while removing the item from the cart.',
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


    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json(
        { message: 'Cart not found for the user' },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      // If the item exists, increment its quantity by one
      cart.items[itemIndex].quantity += 1;


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


// export async function DELETE(req) {
//   try {
//     await connectMongoDB();
//     const { productId} = await req.json();
//     const authorizationHeader = req.headers.get('Authorization');
//    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
//      return NextResponse.json(
//        { message: 'Authorization header is missing or invalid' },
//        { status: 401 }
//      );
//    }
//    const token = authorizationHeader.split('Bearer ')[1];

//    // Now, you can access the userId from the token
//    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//    const userId = decodedToken.userId;

//    // Continue with the rest of your code, using userId as needed
//   //  const cart = await Cart.findOne({ user: userId });
//     const cart = await Cart.findOneAndUpdate(
//       { user: userId },
//       { $pull: { 'items.id': productId } }, // Use 'items.id' to match the product ID
//       { new: true }
//     ).populate("items");
    
//     return NextResponse.json({
//       message: "Item removed from the cart successfully.",
//       items: cart.items, // Include updated items in the response
//     }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "An error occurred while removing the item from the cart.",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// export async function PUT(req) {
//   try {
//     const { items, total } = await req.json();
//     await connectMongoDB();
//     await Cart.updateOne({}, { items, total });
//     return NextResponse.json(
//       { message: "Cart data updated succesfully." },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while updating the cart data" },
//       { status: 500 }
//     );
//   }
// }