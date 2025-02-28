import Hero from "../components/layout/Hero";
import Header from "../components/layout/Header";
import Chatbot from "../components/layout/Chatbot";
import Menu from "../components/layout/Menu";
import Slogan from "../components/layout/Slogan";
import AboutUs from "../components/layout/AboutUs";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Chatbot />
      <Hero />
      <Menu />
      <Slogan />
      <AboutUs />
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
