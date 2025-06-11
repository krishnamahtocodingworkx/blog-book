import { dbConnect } from "@/db/db";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.aggregate([
      {
        $facet: {
          data: [
            ...(search
              ? [{ $match: { title: { $regex: search, $options: "i" } } }]
              : []),
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          metadata: [
            ...(search
              ? [{ $match: { title: { $regex: search, $options: "i" } } }]
              : []),
            { $count: "total" },
            {
              $addFields: {
                totalPages: { $ceil: { $divide: ["$total", limit] } },
                page,
                limit,
              },
            },
          ],
        },
      },
    ]);

    return NextResponse.json(
      {
        message: "Blogs fetched successfully",
        result: blogs?.[0]?.data || [],
        pagination: blogs?.[0]?.metadata?.[0] || {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
        success: true,
      },
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

// export async function GET() {
//   await dbConnect();

//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
//     return NextResponse.json(
//       { result: blogs, message: "Blogs fetch successful", success: true },
//       { status: 200 }
//     );

//   } catch (error) {
//     // Return error message string instead of raw error object
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: errorMessage, success: false },
//       { status: 500 }
//     );
//   }
// }
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
