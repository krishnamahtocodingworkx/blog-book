"use client";
import { BlogCardProps } from "@/utils/modal";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const childVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blogs/${blog.slug}`);
  };
  return (
    <motion.section
      onClick={handleClick}
      className="blog--card py-4 cursor-pointer"
      variants={childVariant}
      whileHover={{ scale: 1.05 }}
    >
      <figure className="blog--image-container">
        <img
          src={blog.coverImageUrl}
          alt="Picture of the author"
          className="image--cover"
          width={300}
          height={200}
        />
      </figure>
      <h4 className="card-title">{blog.title}</h4>
      <button className="custom-button">Read More</button>
    </motion.section>
  );
};

export default BlogCard;
