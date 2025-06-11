import { String } from "@/utils/constants";
import Heading from "./components/Heading";
import RevealAnimation from "./components/RevealAnimation";
import HorizontalScrollbar from "./components/HorizontalScrollbar";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] page--wrapper">
      {/* <div
        className="h-screen w-full bg-cover bg-center  relative"
        style={{
          backgroundImage: "url('/assets/mountains.jpg')",
          objectFit: "contain",
        }}
      >
          <div className="absolute top-[40%] left-[50%]  z-[1000] text-white text-center font-semibold text-5xl">
            {"Parallax"}
          </div>
      </div> */}
      <Heading heading={String.Welcome} />
      <section className="px-25 flex flex-col justify-center gap-3">
        <RevealAnimation>
          <h2 className="font-semibold text-2xl text-[var(--primary)]">
            Who We Are
          </h2>
        </RevealAnimation>
        <RevealAnimation leftReveal={true}>
          <p>{String.Home_Page_paragraph}</p>
        </RevealAnimation>
      </section>
      <section>
        <HorizontalScrollbar />
      </section>
      <section className="h-[300vh]"></section>
    </div>
  );
}
