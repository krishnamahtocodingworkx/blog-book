import { slugify } from "@/utils/commonFunction";
import { BlogType } from "@/utils/modal";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

interface BlogPostPageProps {
  params: { title: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { title } = await params;
  console.log("title :", title);
  const response = await fetch(
    `https://todo-backend-zwg4.onrender.com/blogs/list`
  );
  const post: { message: string; success: boolean; data: BlogType[] } =
    await response.json();
  const postData: BlogType[] = post.data.filter(
    (post: BlogType) => slugify(post.title) === title
  );
  console.log("data ---------------=-", postData);
  const currentPost: BlogType = postData[0];
  console.log("current post :   ", currentPost);
  return {
    title: currentPost.title,
    description: currentPost.description,
    openGraph: {
      title: currentPost.title,
      description: currentPost.description,
      images: [currentPost.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: currentPost.title,
      description: currentPost.description,
      images: [currentPost.imageUrl],
    },
  };
}

export default async function BlogPostPage(props: {
  params: { title: string };
}) {
  const { title } = await props.params;
  console.log("title :", title);
  const response = await fetch(
    `https://todo-backend-zwg4.onrender.com/blogs/list`
  );
  console.log("response :::::::::", response);

  return <BlogClient title={title} />;
}
