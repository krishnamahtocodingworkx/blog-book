import React from "react";

const Heading: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <section className="py-25 flex justify-center items-center">
      <h2 className="font-semibold text-5xl ">{heading}</h2>
    </section>
  );
};

export default Heading;
