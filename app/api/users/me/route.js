import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";

connect();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
