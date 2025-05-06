"use client";
import { BlogCardProps } from "@/utils/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blogs/${blog.slug}`);
  };
  return (
    <section className="blog--card">
      <figure className="blog--image-container">
        <Image
          src={blog.coverImageUrl}
          alt="Picture of the author"
          className="image--cover"
          width={300}
          height={200}
          priority
        />
      </figure>
      <h4 onClick={handleClick} className="card-title">
        {blog.title}
      </h4>
      <button className="custom-button">Read More</button>
    </section>
  );
};

export default BlogCard;
