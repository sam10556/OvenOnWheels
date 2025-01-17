"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const router = useRouter();
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "PUT",
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
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
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
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton label="Delete This Item" onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  );
}
