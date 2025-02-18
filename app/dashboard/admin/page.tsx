"use client";
import { useEffect } from "react";

import Navbar from "@/components/Navbar";

export default function MemberDashboard() {
  

  useEffect(() => {
    // Check if user is logged in (token exists in localStorage)
    const token = localStorage.getItem("token");
    if (!token) {
      // If not logged in, redirect to home page
      window.location.replace("/"); // Replaces the current page in history
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <h1 className="text-4xl text-center py-10">Member Dashboard</h1>
      <p className="text-center">View membership details and renew your plan.</p>
    </div>
  );
}
