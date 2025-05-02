import React from "react";
import Heading from "../components/Heading";
import { String } from "@/utils/constants";

export const metadata = {
  title: "About",
};
const About = () => {
  return (
    <section className="page--wrapper">
      <Heading heading={String.About} />
    </section>
  );
};

export default About;
