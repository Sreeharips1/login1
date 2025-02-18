"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-5 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="input mt-4"
            value={user.age}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="input mt-4"
            value={user.phone}
            onChange={handleChange}
            required
          />
          <input
            name="whatsapp"
            type="text"
            placeholder="WhatsApp Number"
            className="input mt-4"
            value={user.whatsapp}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input mt-4"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input mt-4"
            value={user.password}
            onChange={handleChange}
            required
          />
          <select name="role" className="input mt-4" value={user.role} onChange={handleChange} required>
            <option className="bg-black" value="member">Member</option>
            <option className="bg-black" value="trainer">Trainer</option>
            <option className="bg-black" value="admin">Admin</option>
          </select>

          <button type="submit" className="button mt-6">Register</button>
        </form>
        <p className="text-gray-300 text-sm mt-3 text-center">
          Already have an account? <Link href="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}


