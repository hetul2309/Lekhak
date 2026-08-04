import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

dotenv.config();

const publishedOnlyQuery = () => ({
  $and: [
    {
      $or: [{ status: { $exists: false } }, { status: "published" }],
    },
  ],
});

async function testApi() {
  await mongoose.connect(process.env.MONGODB_CONN, { dbName: "Lekhak" });

  const filter = { ...publishedOnlyQuery() };
  console.log("Filter:", JSON.stringify(filter));

  const count = await Blog.countDocuments(filter);
  console.log("Count:", count);

  const blogs = await Blog.find(filter)
    .select("title slug featuredImage categories author createdAt description")
    .populate("author", "name avatar")
    .populate("categories", "name slug")
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()
    .exec();

  console.log("Found blogs count:", blogs.length);
  if (blogs.length > 0) {
    console.log("First blog title:", blogs[0].title);
    console.log("First blog author:", blogs[0].author);
    console.log("First blog categories:", blogs[0].categories);
  }

  process.exit(0);
}

testApi();
