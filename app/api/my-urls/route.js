import { connect } from "@/dbConfig/dbConfig";
import Url from "@/models/urlModel";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/getUser";

export async function GET() {
  try {
    await connect();

    // ✅ Get user from token
    const user = await getUserFromToken();

    if (!user || !user.userId) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    // ✅ Fetch only user's URLs
    const urls = await Url.find({ userId: user.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      urls,
    });
  } catch (error) {
    console.error("MY URLS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Error fetching URLs" },
      { status: 500 }
    );
  }
}