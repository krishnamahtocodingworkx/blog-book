import { String } from "@/utils/constants";
import Heading from "../components/Heading";
import BlogsPage from "./BlogsPage";
import "./style.css";

export const metadata = {
  title: "Blogs",
};

const Blogs = () => {
  return (
    <section className="blogs-wrapper">
      <Heading heading={String.Latest_News} />
      <BlogsPage />
    </section>
  );
};

export default Blogs;
