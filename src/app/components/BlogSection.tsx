"use client";
import type { BlogSection } from "@/utils/modal";
import Image from "next/image";
import React from "react";
import RevealAnimation from "./RevealAnimation";

const BlogSection: React.FC<BlogSection> = ({ imageUrl, heading, content }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {heading && (
        <RevealAnimation>
          <h3 className="blog--title">{heading}</h3>
        </RevealAnimation>
      )}
      {content && (
        <RevealAnimation>
          <p>{content}</p>
        </RevealAnimation>
      )}
      {imageUrl && (
        <RevealAnimation leftReveal={true} className="w-full">
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
        </RevealAnimation>
      )}
    </div>
  );
};

export default BlogSection;
