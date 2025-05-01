"use client";
import { slugify } from "@/utils/commonFunction";
import { BlogType } from "@/utils/modal";
import React, { useEffect, useState } from "react";
import "./style.css";

const BlogClient: React.FC<{ title: string }> = ({ title }) => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  async function fetchBlogs() {
    const response = await fetch(
      "https://todo-backend-zwg4.onrender.com/blogs/list"
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const blogData = data.data.filter(
        (blog: BlogType) => slugify(blog.title) === title
      )[0];
      setBlog(blogData);
    }
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log(blog);
  if (!blog) return <h2>Blog not found</h2>;
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
