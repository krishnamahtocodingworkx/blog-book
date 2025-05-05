import { dbConnect } from "@/db/db";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      { result: blogs, message: "Blogs fetch successful", success: true },
      { status: 200 }
    );
  } catch (error) {
    // Return error message string instead of raw error object
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await req.json();
    const blog = new Blog(reqBody);
    const updateBlog = await blog.save();
    return NextResponse.json(
      {
        message: "Blog created successful",
        result: updateBlog,
      },
      { status: 201, statusText: "SUCCESS" }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
