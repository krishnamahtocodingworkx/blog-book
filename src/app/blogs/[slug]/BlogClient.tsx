"use client";
import { slugify } from "@/utils/commonFunction";
import { BlogType } from "@/utils/modal";
import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "@/app/components/Loading";
import Heading from "@/app/components/Heading";
import { String } from "@/utils/constants";

const BlogClient: React.FC<{ title: string }> = ({ title }) => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  async function fetchBlogs() {
    try {
      const response = await fetch(
        "https://todo-backend-zwg4.onrender.com/blogs/list"
      );
      const data = await response.json();
      if (data.success) {
        const blogData = data.data.filter(
          (blog: BlogType) => slugify(blog.title) === title
        )[0];
        setBlog(blogData);
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
        <img src={blog?.imageUrl} alt="" className="image--cover" />
      </figure>
      <h2 className="blog--title">{blog?.title}</h2>
      <p>{blog?.description}</p>
    </div>
  );
};

export default BlogClient;
