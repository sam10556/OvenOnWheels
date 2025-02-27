"use client";
import { motion } from "framer-motion";
import { GiFullPizza } from "react-icons/gi";
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <motion.div
        className="flex items-center justify-center w-28 h-28 bg-white rounded-full shadow-lg"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <GiFullPizza className="text-red-600 text-7xl" />
      </motion.div>
      <p className="mt-6 text-2xl font-bold text-red-800 animate-pulse">Baking your pizza...</p>
    </div>
  );
};

export default Loading;