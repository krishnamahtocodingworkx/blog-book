"use client";
import React from "react";
import { motion } from "framer-motion";
const Heading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <section className="py-25 flex justify-center items-center">
      <motion.h1
        className="font-semibold text-5xl "
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0.5 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {heading}
      </motion.h1>
    </section>
  );
};

export default Heading;
