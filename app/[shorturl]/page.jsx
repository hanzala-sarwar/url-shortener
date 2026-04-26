import { redirect } from "next/navigation";
import { connect } from "@/dbConfig/dbConfig";
import Url from "@/models/urlModel";

export default async function Page({ params }) {
  // 1️⃣ Await params (Next.js 15+ behavior)
  const { shorturl } = await params;

  // 2️⃣ Connect to MongoDB
  await connect();

  // 3️⃣ Find URL in database
  const doc = await Url.findOne({ shorturl });

  // 4️⃣ Redirect based on result
  if (doc && doc.url) {
    redirect(doc.url);
  } else {
    redirect(process.env.NEXT_PUBLIC_HOST || "/");
  }

 
}