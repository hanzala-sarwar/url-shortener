import { connect } from "@/dbConfig/dbConfig";
import Url from "@/models/urlModel";
import { getUserFromToken } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect(); // ✅ must await the DB connection

    const reqBody = await request.json();
    const { url, shorturl } = reqBody;

    // ✅ Basic input validation
    if (!url || !shorturl) {
      return NextResponse.json(
        { success: false, error: true, message: "Both url and shorturl are required" },
        { status: 400 }
      );
    }

    // ✅ GET USER (IMPORTANT)
    const user = await getUserFromToken(); // { userId } or null

    // ✅ Check if short URL already exists
    const doc = await Url.findOne({ shorturl });
    if (doc) {
      return NextResponse.json(
        { success: false, error: true, message: "Short URL already exists!" },
        { status: 400 }
      );
    }

    
      // ✅ Save URL (with or without user)
    const newUrl = new Url({
      url,
      shorturl,
      userId: user ? user.userId : null, // 🔥 key line
    });
    const result = await newUrl.save();

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "URL Generated Successfully",
        insertedId: result._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/shorten:", error);
    return NextResponse.json(
      { success: false, error: true, message: "Something went wrong" },
      { status: 500 }
    );
  }
} 