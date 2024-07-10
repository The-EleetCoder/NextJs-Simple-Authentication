import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendemail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = req.json();
    console.log(reqBody);
    const { username, email, password }: any = reqBody;

    // TODO: do input validation here

    const user = User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    // send verification email
    await sendemail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
