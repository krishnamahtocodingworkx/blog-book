import { String } from "@/utils/constants";
import Heading from "./components/Heading";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] page--wrapper">
      <Heading heading={String.Welcome} />
    </div>
  );
}
