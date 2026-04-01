import React from "react";
import { Outlet } from "react-router";
import DashboardNav from "../components/DashboardNav/DashboardNav";
import DashboardLeft from "../components/DashboardLeft/DashboardLeft";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 p-6 lg:p-8 gap-8">
      {/* 1. Sidebar - No longer 'fixed' so it stays in the flex flow */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-8 h-[calc(100vh-64px)]">
          <DashboardLeft />
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        {/* Navbar inside the content area */}
        <div className="mb-6">
          <DashboardNav />
        </div>

        {/* Dynamic Content */}
        <main className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 md:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
