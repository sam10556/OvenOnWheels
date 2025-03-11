"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../AppContext";
import Cart from "@/components/icons/Cart";
import Bars2 from "@/components/icons/Bars2";

function AuthLinks({ status, userName }) {
  return status === "authenticated" ? (
    <>
      <Link
        className="hover:underline text-4xl  md:text-base lg:text-xl font-semibold"
        href="/profile"
      >
        {userName}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="border-none font-semibold text-4xl md:text-base lg:text-xl text-white rounded-full px-6"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        className="hover:underline font-semibold text-4xl md:text-base lg:text-xl"
        href="/register"
      >
        Register
      </Link>
      <Link
        href="/login"
        className="bg-primary font-semibold text-white text-4xl md:text-base lg:text-xl rounded-full px-6 py-2"
      >
        Login
      </Link>
    </>
  );
}

export default function Header() {
  const { status, data } = useSession();
  const router = useRouter();
  const userName = data?.user?.name?.split(" ")[0] || data?.user?.email;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileNavOpen]);

  const handleCartClick = () => {
    router.push(status === "authenticated" ? "/cart" : "/login");
  };
  return (
    <header
      className={`top-0 sticky left-0 w-full z-20 shadow-md transition-all duration-400 ${
        scrolled ? "bg-red-600/90 md:backdrop-blur-md" : "bg-red-600"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-6 lg:py-7">
        {/* Logo */}
        <Link
          className="text-white mx-2 font-bold font-hlo text-2xl md:text-4xl"
          href="/"
        >
          Oven On Wheels
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 md:gap-5 lg:gap-10 text-base lg:text-xl font-ibm text-[#fff3dd] uppercase font-semibold">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/menu">
            Menu
          </Link>
          <Link className="hover:underline" href="/#about">
            About
          </Link>
          <Link className="hover:underline" href="/#contact">
            Contact
          </Link>
          <AuthLinks status={status} userName={userName} />
          <button
            onClick={handleCartClick}
            className="flex border-none gap-2 items-center p-0"
          >
            <Cart />
            {cartProducts?.length > 0 && (
              <>
                <span className="font-ibm font-normal text-[#fff3dd]">
                  cart
                </span>
                <span className="bg-white text-[#664d36] text-xs px-[6px] py-[2px] rounded-full">
                  {cartProducts.length}
                </span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-6">
          <button onClick={handleCartClick} className="relative border-none">
            <Cart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {cartProducts.length}
              </span>
            )}
          </button>
          <button
            className="border-none"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Bars2 />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed z-30 top-0 left-0 w-full h-full bg-red-600 border-r border-gray-900 dark:border-gray-600 ease-in-out overflow-y-hidden duration-500 md:hidden transform ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="font-bold flex justify-end pt-5 text-4xl">
          <button
            onClick={() => setMobileNavOpen(false)}
            className="text-white border-none"
          >
            ✖
          </button>
        </div>
        <nav className="flex flex-col gap-20 items-center mt-12 text-center text-white">
          <Link
            href="/"
            className="text-4xl font-semibold hover:text-[#147EFB]"
            onClick={() => setMobileNavOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-4xl font-semibold hover:text-[#147EFB]"
            onClick={() => setMobileNavOpen(false)}
          >
            Menu
          </Link>
          <Link
            href="/#about"
            className="text-4xl font-semibold hover:text-[#147EFB]"
            onClick={() => setMobileNavOpen(false)}
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="text-4xl font-semibold hover:text-[#147EFB]"
            onClick={() => setMobileNavOpen(false)}
          >
            Contact
          </Link>
          <AuthLinks status={status} userName={userName} />
        </nav>
      </div>
    </header>
  );
}
