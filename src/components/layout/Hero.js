import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="relative w-screen h-[100vh] flex flex-col items-center justify-center">
        <Image
          src="/Wallpaper.jpg"
          alt="Wallpaper"
          fill
          className="object-cover"
          priority
        />

        <div className="flex flex-col items-center gap-4">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]">
            <img
              src="/Offer.gif"
              alt="Pizza GIF"
              className="w-full h-full object-contain z-10 rounded-3xl"
            />
          </div>

          <button className="w-60 py-2 rounded-full text-2xl font-semibold shadow-lg bg-[#fff3dd] text-primary hover:bg-primary hover:text-[#fff3dd] duration-200 transition z-10">
            <Link href={'/menu'}>Order Now</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
