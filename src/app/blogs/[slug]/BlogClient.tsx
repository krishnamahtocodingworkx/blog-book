"use client";
import { BlogType } from "@/utils/modal";
import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "@/app/components/Loading";
import Heading from "@/app/components/Heading";
import { String } from "@/utils/constants";
import BlogSection from "@/app/components/BlogSection";
import Image from "next/image";

const BlogClient: React.FC<{ title: string }> = ({ title }) => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  async function fetchBlogs() {
    try {
      const response = await fetch(`/api/blogs/${title}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.result);
      }
    } catch (error) {
      console.log("Error in blog fetching :", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (!blog) return <Heading heading={String.Blog_Not_Found} />;
  return (
    <div className="blog--container">
      <figure className="blog--image-container">
        <Image
          src={blog.coverImageUrl}
          alt="banner"
          className="image--cover"
          height={200}
          width={300}
          priority
        />
      </figure>
      <h2 className="blog--title">{blog?.title}</h2>
      <p>{blog?.description}</p>
      <section className="flex flex-col gap-8">
        {blog?.data.map((section) => (
          <BlogSection
            key={section._id}
            _id={section._id}
            imageUrl={section.imageUrl}
            heading={section.heading}
            content={section.content}
          />
        ))}
      </section>
    </div>
  );
};

export default BlogClient;
