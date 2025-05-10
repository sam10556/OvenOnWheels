"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  }

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="bg-white/80 backdrop-blur-xl border border-yellow-400/30 rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 relative">
        <h1 className="text-4xl text-center font-extrabold text-red-600 mb-6 drop-shadow-sm">
          Join The Party! 🍕
        </h1>

        {userCreated && (
          <div className="text-green-700 bg-green-100 p-3 rounded text-center mb-4 border border-green-300 font-medium">
            Registration successful!{" "}
            <Link href="/login" className="underline text-green-800">
              Login &raquo;
            </Link>
          </div>
        )}

        {error && (
          <div className="text-red-700 bg-red-100 p-3 rounded text-center mb-4 border border-red-300 font-medium">
            Something went wrong. Please try again!
          </div>
        )}

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={creatingUser}
            className="w-full px-4 py-3 bg-white border-2 border-yellow-400 rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            disabled={creatingUser}
            className="w-full px-4 py-3 bg-white border-2 border-yellow-400 rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            required
          />
          <button
            type="submit"
            disabled={creatingUser}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition"
          >
            {creatingUser ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-red-300" />
          <span className="text-sm text-gray-600">OR</span>
          <div className="h-px flex-1 bg-red-300" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 w-full py-3 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
        >
          <Image src="/google.png" alt="Google Icon" width={20} height={20} />
          <span className="font-medium text-gray-800">
            Register with Google
          </span>
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-semibold underline">
            Login Here
          </Link>
        </div>
      </div>
    </section>
  );
}
