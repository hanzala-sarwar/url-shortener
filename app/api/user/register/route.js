import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";


export async function POST(req) {
  try {
    await connect(); // ✅ must await the DB connection

    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, message: "Account created successfully." }, { status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
