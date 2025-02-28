"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/layout/Loading";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/menu-items").then((res) => res.json()),
    ]).then(([categories, menuItems]) => {
      setCategories(categories);
      setMenuItems(menuItems);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <motion.div
            key={c._id}
            id={c.name.toLowerCase()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <motion.div
              className="grid gap-2 sm:grid-cols-3 mt-6 mb-12 mx-auto max-w-screen-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3,
              }}
            >
              {menuItems
                .filter((m) => m.category === c._id)
                .map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MenuItem {...item} />
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        ))}
    </section>
  );
}
