"use client";
import type { BlogSection } from "@/utils/modal";
import Image from "next/image";
import React from "react";

const BlogSection: React.FC<BlogSection> = ({ imageUrl, heading, content }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {heading && <h3 className="blog--title">{heading}</h3>}
      {content && <p>{content}</p>}
      {imageUrl && (
        <figure className="blog--image-container">
          <Image
            src={imageUrl}
            alt="cover"
            className="image--cover"
            width={300}
            height={200}
            priority
          />
        </figure>
      )}
    </div>
  );
};

export default BlogSection;
