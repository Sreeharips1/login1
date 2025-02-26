// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Navbar */}
//         <Navbar />

//         {/* Page Content */}
//         <div className="p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex">
        {/* Sidebar (visible on large screens, toggleable on small screens) */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
        >
          <Sidebar />
        </div>

        {/* Overlay for small screens (closes sidebar when clicked) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}