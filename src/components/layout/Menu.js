"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="">
      {/* <div className="absolute left-0 right-0 w-full">
        <div className="absolute left-0 -top-[70px] -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt="salad" />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt="salad" />
        </div>
      </div> */}
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-6 md:gap-12 mx-10 md:mx-28 place-items-center max-w-full">
        {[
          { label: "Pizzas", image: "/Margherita.jpg", link: "/menu#pizza" },
          { label: "Pasta", image: "/marguerite.png", link: "/menu#pasta" },
          { label: "Dessert", image: "/brownie.png", link: "/menu#dessert" },
        ].map((item, index) => (
          <div key={index} className="relative">
            {/* Image */}
            <Image
              src={item.image}
              width={1000}
              height={1000}
              className="rounded-3xl"
              alt={item.label}
            />
            {/* Button */}
            <button className="max-w-36 rounded-full absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-[#fff3dd] text-primary hover:bg-primary hover:text-[#fff3dd] font-semibold text-2xl border-none duration-200 text-center">
              <Link href={item.link}>{item.label}</Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
