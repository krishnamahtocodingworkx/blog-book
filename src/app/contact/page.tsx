import React from "react";
import Heading from "../components/Heading";
import { String } from "@/utils/constants";

export const metadata = {
  title: "Contact",
};
const Contact = () => {
  return (
    <section className="page--wrapper">
      <Heading heading={String.Contact} />
    </section>
  );
};

export default Contact;
