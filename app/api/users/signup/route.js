import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {  NextResponse } from "next/server";
connect();


export  async function POST(request) {
    try {
        const reqBody = await request.json()
        const { fullname, username, email, phone, password, address } = reqBody;

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullname,
            username,
            email,
            phone,
            password: hashedPassword,
            address,
        });

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
