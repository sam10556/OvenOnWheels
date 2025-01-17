"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const router = useRouter();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev,data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });

    router.push("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 ">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"}>
          <span>Show All Menu</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
