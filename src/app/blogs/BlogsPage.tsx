"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import BlogCard from "../components/BlogCard";
import { BlogType } from "@/utils/modal";
import Loading from "../components/Loading";
import Heading from "../components/Heading";
import { String } from "@/utils/constants";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (data.success) {
          setBlogs(data.result);
        }
      } catch (error) {
        console.log("Error in blog fetching :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="">
      {blogs.length > 0 ? (
        <section className="blogs-card-container">
          {blogs.slice(0, 3).map((blog: BlogType, i: number) => (
            <BlogCard key={i} blog={blog} />
          ))}
        </section>
      ) : (
        <Heading heading={String.Blogs_Not_Found} />
      )}
    </section>
  );
};

export default BlogsPage;
