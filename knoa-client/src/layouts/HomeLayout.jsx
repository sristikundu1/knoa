import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const HomeLayout = () => {
  return (
    <div className="font-inter flex flex-col min-h-screen">
      {/* HEADER: Full width background */}
      <header className="w-full bg-base-100 shadow-md border-b border-base-200">
        <div className="max-w-9/12 mx-auto px-4">
          <Navbar />
        </div>
      </header>

      {/* MAIN: Full width background, but CONTENT is max-w-7xl */}
      <main className="flex-grow w-full">
        <div className=" ">
          <Outlet />
        </div>
      </main>

      {/* FOOTER: Full width background (e.g., dark neutral) */}
      <footer className="w-full bg-[#00b4d8] text-neutral-content">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;
