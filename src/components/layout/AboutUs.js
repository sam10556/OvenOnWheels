import Image from "next/image";
import SectionHeaders from "../layout/SectionHeaders";

export default function AboutUs() {
  return (
    <section className="text-center my-16 px-4" id="about">
      <SectionHeaders subHeader="Our Story" mainHeader="About Us" />
      <div className="w-3/4 md:max-w-full mx-auto mt-8 flex flex-wrap items-center justify-center gap-12 md:gap-40">
        <Image
          src="/pizza.png"
          width={400}
          height={400}
          alt="Delicious pizza"
          className="animate-slow-spin max-w-full"
        />
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-2xl  md:text-left text-justify font-hlo">
          We’re computer engineers who turned our
          late-night coding sessions and love for pizza into something bigger.
          What started as a side hustle became a passion—serving fresh,
          oven-baked joy on wheels. With tech precision and homemade warmth, we
          deliver happiness, one slice at a time. 
        </p>
      </div>
    </section>
  );
}
