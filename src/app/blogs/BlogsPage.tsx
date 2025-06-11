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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Faster stagger
      delayChildren: 0.1, // Slight initial delay
    },
  },
};

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 6,
    total: 6,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      if (!loading) setLoading(true);
      try {
        const response = await fetch(`/api/blogs?page=${pagination.page}`);
        const data = await response.json();
        if (data.success) {
          setBlogs(data.result);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error in blog fetching :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [pagination.page]);
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="">
      <div className=" flex justify-center items-center gap-5 ">
        <button
          disabled={pagination.page === 1}
          className="custom-button"
          onClick={() =>
            setPagination({ ...pagination, page: pagination.page - 1 })
          }
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPagination({ ...pagination, page: pagination.page + 1 })
          }
          disabled={pagination.page === pagination.totalPages}
          className="custom-button"
        >
          Next
        </button>
      </div>
      {blogs.length > 0 ? (
        <motion.section
          className="blogs-card-container "
          variants={parentVariant}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog: BlogType, i: number) => (
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
