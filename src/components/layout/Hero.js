"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/Wallpaper.jpg"
          alt="Delicious Pizza Background"
          className="w-full h-full object-cover filter brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center lg:-mt-12 px-4 text-center">
        <div
          className={`transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Hot & Fresh
            <br />
            <span className="text-red-600">Pizza</span> Delivered
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-md mx-auto mb-8">
            Authentic flavors, premium ingredients, ready in minutes.
          </p>
        </div>

        {/* Pizza Promotion */}
        <div
          className={`relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[500px] lg:h-[500px] mb-8 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img
            src="/Offer.gif"
            alt="Special Pizza Promotion"
            className="w-full h-full object-contain rounded-3xl shadow-2xl"
          />
          <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-red-600 text-white text-sm md:text-base font-bold rounded-full py-2 px-4 shadow-lg rotate-12 animate-bounce">
            Too Good to Miss!
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={"/menu"}
          className={`group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Order Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
