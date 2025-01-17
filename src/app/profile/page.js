"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Infobox from "../../components/layout/Infobox";
import Successbox from "../../components/layout/Successbox";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          setUser(data)
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Saved!",
      error: "Error",
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("files", files[0]);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        toast.success("Upload complete");
      } else {
        toast.error("upload error!");
      }
      const link = await res.json();
      setImage(link);
    }
  }
  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto items-center mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
