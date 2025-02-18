"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") router.push("/dashboard/admin");
      else if (res.data.user.role === "trainer") router.push("/dashboard/trainer");
      else router.push("/dashboard/member");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-5 text-center">Login</h2>
        <input type="email" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input mt-4" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className="button mt-6">Login</button>
        <p className="text-gray-300 text-sm mt-3 text-center">
          Don't have an account? <a href="/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  );
}

