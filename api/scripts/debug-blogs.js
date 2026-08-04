import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/blog.model.js";

dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_CONN, { dbName: "Lekhak" });
  console.log("Connected to MONGODB_CONN!");

  const rawCount = await Blog.countDocuments({});
  console.log("Raw Blog count:", rawCount);

  const publishedCount = await Blog.countDocuments({ status: "published" });
  console.log("Published status count:", publishedCount);

  const sample = await Blog.find({}).limit(2).lean();
  console.log("Sample blogs:", JSON.stringify(sample, null, 2));

  process.exit(0);
}

check();
