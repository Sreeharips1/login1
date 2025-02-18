"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    age: "",
    phone: "",
    whatsapp: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-5 text-center">Register</h2>

        <input name="name" type="text" placeholder="Full Name" className="input" onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" className="input mt-4" onChange={handleChange} />
        <input name="phone" type="text" placeholder="Phone Number" className="input mt-4" onChange={handleChange} />
        <input name="whatsapp" type="text" placeholder="WhatsApp Number" className="input mt-4" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="input mt-4" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input mt-4" onChange={handleChange} />

        <select name="role" className="input mt-4" onChange={handleChange}>
          <option className="bg-black" value="member">Member</option>
          <option className="bg-black" value="trainer">Trainer</option>
          <option className="bg-black" value="admin">Admin</option>
        </select>

        <button onClick={handleRegister} className="button mt-6">Register</button>
        <p className="text-gray-300 text-sm mt-3 text-center">
          Already have an account? <a href="/login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  );
}

