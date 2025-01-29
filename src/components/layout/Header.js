"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../AppContext";
import Cart from "@/components/icons/Cart";
import Bars2 from "@/components/icons/Bars2";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link className="whitespace-nowrap" href={"/profile"}>
          {userName}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-primary text-white rounded-full px-8 py-2 "
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/register"}>Register</Link>
        <Link
          href={"/login"}
          className="bg-primary text-white rounded-full px-8 py-2 "
        >
          Login
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const handleCartClick = () => {
    console.log(userName);
    if (status === "authenticated") {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <header>
        <div className="flex items-center md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href="/">
            Oven On Wheels
          </Link>
          <div className="flex gap-8 items-center">
            <button
              onClick={handleCartClick}
              className="relative border-none p-0"
            >
              <Cart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </button>
            <button
              className="p-1 border-0"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              <Bars2 />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
          >
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
            <AuthLinks status={status} userName={userName} />
          </div>
        )}

        <div className="hidden md:flex items-center justify-between">
          <Link className="text-primary font-semibold text-2xl" href="/">
            Oven On Wheels
          </Link>
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            <AuthLinks status={status} userName={userName} />
            <button
              onClick={handleCartClick}
              className="relative border-none p-0"
            >
              <Cart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
