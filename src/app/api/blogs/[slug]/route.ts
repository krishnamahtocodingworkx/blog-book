import { NextResponse } from "next/server";
import Blog from "@/models/blog.model";
import { dbConnect } from "@/db/db";

interface Params {
  slug: string;
}

// The GET function receives a `Request` and `context` with params
export async function GET(request: Request, { params }: { params: Params }) {
  await dbConnect();

  try {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required", success: true },
        { status: 400 }
      );
    }

    // Find blog by slug, use lean() for plain JS object
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found", success: true },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result: blog, message: "Blog fetched successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}
