import React from "react";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { router } = useAppContext();

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <div
        onClick={() => router.push("/")}
        className="logo text-1xl font-bold w-28 lg:w-32 cursor-pointer"
      >
        <span className="text-yellow-700">G</span>EO GADGETS
      </div>
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
