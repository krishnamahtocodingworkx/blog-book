import { BlogType } from "@/utils/modal";
import { Metadata } from "next";
import React from "react";
import BlogClient from "./BlogClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(
    `${"https://blog-book-nine.vercel.app"}/api/blogs/${slug}`
  );
  const data = await response.json();
  const blog: BlogType = data.result;
  // console.log("blog :", blog);
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.coverImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.coverImageUrl],
    },
  };
}
const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slugId = (await params).slug;
  return <BlogClient title={slugId} />;
};

export default Blog;
