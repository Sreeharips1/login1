
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        { email, password },
        {withCredentials:true},
        
        
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;


      router.push(`/dashboard/${data.user.role}`);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-5 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input mt-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="button mt-6">Login</button>
        </form>
        <p className="text-gray-300 text-sm mt-3 text-center">
          Don&apos;t have an account? <Link href="/register" className="text-primary">Register</Link>
        </p>
      </div>
    </div>
  );
}


