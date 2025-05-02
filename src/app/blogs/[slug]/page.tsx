import { BlogType } from "@/utils/modal";
import { Metadata } from "next";
import React from "react";
import BlogClient from "./BlogClient";
import { slugify } from "@/utils/commonFunction";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  console.log("slug in generateMetadata", slug);
  const response = await fetch(
    `https://todo-backend-zwg4.onrender.com/blogs/list`
  );
  const data = await response.json();
  const blogs: BlogType[] = data.data;
  const blog:BlogType = blogs.filter((blog:BlogType) => slugify(blog.title) === slug)[0];

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.imageUrl],
    },
  };
}
const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slugId = (await params).slug;
  return <BlogClient title={slugId} />;
};

export default Blog;
