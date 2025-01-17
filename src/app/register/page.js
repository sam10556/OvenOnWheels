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
  const [message, setMessage] = useState("");
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
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User Created,
          <br /> Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please Try Again.
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={creatingUser}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={creatingUser}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={creatingUser}
          className="block w-full bg-blue-500 text-white py-2 rounded"
        >
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={()=> signIn('google',{callbackUrl:'/'})} className="flex gap-6 justify-center items-center w-full p-2 border border-gray-300 rounded">
          <Image src="/google.png" alt="Google Icon" width={24} height={24} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing Account?{' '} <Link className="underline" href={'/login'}>Login Here</Link>
        </div>
      </form>
    </section>
  );
}
