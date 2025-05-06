// import cloudinary from "@/utils/cloudinary";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { image } = req.body;
//     const uploadededImage = await cloudinary.uploader.upload(image);
//     return NextResponse.json(
//       {
//         success: true,
//         result: uploadededImage,
//         message: "Image uploaded successful",
//       },
//       { status: 200, statusText: "SUCCESS" }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         error,
//         message: "Something went wrong",
//       },
//       { status: 500, statusText: "Internal Server Error" }
//     );
//   }
// }

import cloudinary from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body from request
    const { image } = await req.json();

    // Validate input
    if (!image || typeof image !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image data provided",
        },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image);

    return NextResponse.json(
      {
        success: true,
        result: uploadedImage,
        message: "Image uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
