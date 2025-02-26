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
    gender: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    switch (e.target.name) {
      case "name":
        setErrors((prev) => ({
          ...prev,
          name: /\d/.test(e.target.value) ? "Full Name cannot contain numbers" : "",
        }));
        break;
      case "phone":
      case "whatsapp":
        setErrors((prev) => ({
          ...prev,
          [e.target.name]: /^\d{10}$/.test(e.target.value) ? "" : "Must be a valid 10-digit number",
        }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password: e.target.value.length < 6 ? "Password must be at least 6 characters" : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let validationErrors: { [key: string]: string } = {};

    if (!user.name || /\d/.test(user.name)) validationErrors.name = "Full Name cannot contain numbers";
    if (!user.phone || !/^\d{10}$/.test(user.phone)) validationErrors.phone = "Must be a valid 10-digit number";
    if (!user.whatsapp || !/^\d{10}$/.test(user.whatsapp)) validationErrors.whatsapp = "Must be a valid 10-digit number";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) validationErrors.email = "Invalid email format";
    if (!user.password || user.password.length < 6) validationErrors.password = "Password must be at least 6 characters";
    if (!user.gender) validationErrors.gender = "Please select your gender";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setErrors({ form: err.response?.data?.message || "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-5 text-center">Register</h2>
        {errors.form && <p className="text-red-500 text-sm mb-3">{errors.form}</p>}
        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input name="name" type="text" placeholder="Full Name" className="input w-full" value={user.name} onChange={handleChange} required />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <input name="age" type="number" placeholder="Age" className="input w-full" value={user.age} onChange={handleChange} required />
          <select name="gender" className="input w-full" value={user.gender} onChange={handleChange} required>
            <option className="text-black" value="" disabled>Select Gender</option>
            <option className="text-black" value="male">Male</option>
            <option className="text-black" value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm col-span-2">{errors.gender}</p>}
          <input name="phone" type="text" placeholder="Phone Number" className="input w-full" value={user.phone} onChange={handleChange} required />
          {errors.phone && <p className="text-red-500 text-sm col-span-2">{errors.phone}</p>}
          <input name="whatsapp" type="text" placeholder="WhatsApp Number" className="input w-full" value={user.whatsapp} onChange={handleChange} required />
          {errors.whatsapp && <p className="text-red-500 text-sm col-span-2">{errors.whatsapp}</p>}
          <div className="col-span-2">
            <input name="email" type="email" placeholder="Email" className="input w-full" value={user.email} onChange={handleChange} required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="col-span-2">
            <input name="password" type="password" placeholder="Password" className="input w-full" value={user.password} onChange={handleChange} required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button type="submit" className="button mt-6 w-full col-span-2">Register</button>
        </form>
        <p className="text-red-500 text-sm mt-3 text-center">
          Already have an account? <Link href="/login" className="text-primary text-white">Login</Link>
        </p>
      </div>
    </div>
  );
}