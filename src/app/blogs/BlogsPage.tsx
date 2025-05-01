"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import BlogCard from "../components/BlogCard";
import { BlogType } from "@/utils/modal";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  async function fetchBlogs() {
    const response = await fetch(
      "https://todo-backend-zwg4.onrender.com/blogs/list"
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setBlogs(data.data);
    }
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log(blogs);
  return (
    <section className="">
      {blogs.length > 0 ? (
        <section className="blogs-card-container">
          {blogs.slice(0, 3).map((blog: BlogType, i: number) => (
            <BlogCard key={i} blog={blog} />
          ))}
        </section>
      ) : (
        <h2>No data found</h2>
      )}
    </section>
  );
};

export default BlogsPage;
