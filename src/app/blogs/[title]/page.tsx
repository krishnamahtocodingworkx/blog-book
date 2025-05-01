import { slugify } from "@/utils/commonFunction";
import { BlogType } from "@/utils/modal";
import { Metadata } from "next";
import React from "react";
import BlogClient from "./BlogClient";

interface BlogPostPageProps {
  params: { title: string };
}

export async function generateMetadata({
  params: { title },
}: BlogPostPageProps): Promise<Metadata> {
  const response = await fetch(
    "https://todo-backend-zwg4.onrender.com/blogs/list"
  );
  const data = await response.json();
  const blogData = data.data.filter(
    (blog: BlogType) => slugify(blog.title) === title
  )[0];
  if (!blogData) {
    return {
      title: "Blog Not Found",
      description: "This blog post does not exist.",
    };
  }

  return {
    title: blogData?.title,
    description: blogData?.description,
    openGraph: {
      title: blogData?.title,
      description: blogData?.description,
      images: [blogData?.imageUrl],
    },
  };
}

const Blog = ({ params: { title } }: BlogPostPageProps) => {
  return <BlogClient title={title} />;
};

export default Blog;
