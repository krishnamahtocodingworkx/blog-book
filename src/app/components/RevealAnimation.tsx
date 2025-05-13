"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const RevealAnimation: React.FC<{
  children: React.ReactNode;
  leftReveal?: boolean;
  className?: string;
}> = ({ children, leftReveal, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const slideControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
      slideControl.start("visible");
    }
  }, [isInView]);
  return (
    <div ref={ref} className={`relative w-fit overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 75,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: leftReveal ? { right: 0 } : { left: 0 },
          visible: leftReveal ? { right: "100%" } : { left: "100%" },
        }}
        initial="hidden"
        animate={slideControl}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-0 bottom-0 right-0 left-0 z-20 bg-[var(--primary)]"
      />
    </div>
  );
};

export default RevealAnimation;
