import React from "react";
import RevealAnimation from "./RevealAnimation";

const Heading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <section className="py-25 flex justify-center items-center">
      <RevealAnimation>
        <h2 className="font-semibold text-5xl">{heading}</h2>
      </RevealAnimation>
    </section>
  );
};

export default Heading;
