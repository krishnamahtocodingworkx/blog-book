"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import BlogCard from "../components/BlogCard";
import { BlogType } from "@/utils/modal";
import Loading from "../components/Loading";
import Heading from "../components/Heading";
import { String } from "@/utils/constants";
import { motion } from "framer-motion";

const parentVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

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
        console.error("Error in blog fetching :", error);
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
        <motion.section
          className="blogs-card-container"
          variants={parentVariant}
          initial="hidden"
          animate="visible"
        >
          {blogs.slice(0, 3).map((blog: BlogType, i: number) => (
            <BlogCard key={i} blog={blog} />
          ))}
        </motion.section>
      ) : (
        <Heading heading={String.Blogs_Not_Found} />
      )}
    </section>
  );
};

export default BlogsPage;
