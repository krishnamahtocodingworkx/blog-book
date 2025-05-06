// import { NextResponse } from "next/server";
// import Blog from "@/models/blog.model";
// import { dbConnect } from "@/db/db";

import { dbConnect } from "@/db/db";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   context: { params: { slug: string } }
// ) {
//   await dbConnect();

//   try {
//     const { slug } = await context.params;
//     if (!slug) {
//       return NextResponse.json(
//         { error: "Slug parameter is required", success: false },
//         { status: 400 }
//       );
//     }

//     const blog = await Blog.findOne({ slug }).lean();

//     if (!blog) {
//       return NextResponse.json(
//         { error: "Blog not found", success: false },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { result: blog, message: "Blog fetched successfully", success: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: errorMessage, success: false },
//       { status: 500 }
//     );
//   }
// }

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  try {
    const slug = (await params).slug;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required", success: false },
        { status: 400 }
      );
    }

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found", success: false },
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
