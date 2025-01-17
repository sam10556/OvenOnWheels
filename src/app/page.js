import Hero from "../components/layout/Hero";
import Menu from "../components/layout/Menu";
import SectionHeaders from "../components/layout/SectionHeaders";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+1234567890"
          >
            +1234567890
          </a>
        </div>
      </section>
    </>
  );
}
