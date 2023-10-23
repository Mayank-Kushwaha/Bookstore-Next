import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

connectMongoDB();

export async function POST(req) {
  const cookie = cookies();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Please provide all the fields" },
      { status: 422 }
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist with that email" },
        { status: 404 }
      );
    }

    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
     
      cookie.set("token", token, {
        httpOnly: true,
        secure: true,
        maxAge:  7 * 24 * 60 * 60, // 7 days
      });
      const { name, email } = user;

      return NextResponse.json(
        { token, user: { name, email } },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Email or password don't match" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while loging the user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
