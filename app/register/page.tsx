"use client";
import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    age: "",
    gender: "male",
    phone_number: "",
    emergency_contact: "",
    address: "",
    pincode: "",
    health_condition: "Normal",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        alert("Registration Successful!");
        router.push("/dashboard");
      } else {
        setError(data.error || "Error in Registration");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border-2 border-red-600">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Emergency Contact</label>
              <input
                type="text"
                name="emergency_contact"
                placeholder="Enter emergency contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter your pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Health Condition</label>
              <textarea
                name="health_condition"
                placeholder="Enter any health conditions or concerns"
                value={formData.health_condition}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
                rows={3}
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Health Condition</label>
              <select
                name="health_condition"
                value={formData.health_condition}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500"
              >
                <option value="male">Normal</option>
                <option value="female">Not Normal</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400 hover:text-red-600">Login</Link>
        </p>
        <p className="text-white text-sm text-center">
           By registering, you agree to{" "}
           <Link href="/terms-policy" className="text-red-400 underline hover:text-red-600 transition-all">
             Terms & Privacy Policy
           </Link>
         </p>
         <div className="flex justify-center mt-4">
           <Link
            href="/"
            className="text-red-600 hover:text-red-800 transition-all duration-300 flex items-center justify-center"
          >
            <Home className="w-6 h-6 md:w-8 md:h-8 transition-transform transform hover:scale-110" />
          </Link>
        </div>        
      </div>
    </div>
  );
}
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Home } from "lucide-react";

// export default function RegisterForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     age: "",
//     gender: "male",
//     phone_number: "",
//     emergency_contact: "",
//     address: "",
//     pincode: "",
//     health_condition: "",
//     profile_image: null as File | null,
//   });

//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Get email from URL if available (from OTPless redirect)
//   useEffect(() => {
//     const email = searchParams.get('email');
//     if (email) {
//       setFormData(prev => ({ ...prev, email }));
//     }
//   }, [searchParams]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData({ ...formData, profile_image: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const formDataObj = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== '') formDataObj.append(key, value);
//     });

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         body: formDataObj,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Save token in localStorage for authentication
//         localStorage.setItem('authToken', data.token);
//         alert("Registration Successful!");
//         router.push("/dashboard");
//       } else {
//         setError(data.error || "Error in Registration");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
//       <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border-2 border-red-600">
//         <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Profile Image Upload */}
//           <div className="flex justify-center">
//             <label className="relative cursor-pointer">
//               <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
//               {preview ? (
//                 <Image src={preview} alt="Profile" width={100} height={100} className="rounded-full border-4 border-gray-400 object-cover" />
//               ) : (
//                 <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-red-600 bg-gray-700">
//                   <span className="text-2xl text-gray-400">📷</span>
//                 </div>
//               )}
//             </label>
//           </div>

//           {/* Form Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="full_name"
//                 placeholder="Enter your full name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Enter your age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
//               <input
//                 type="text"
//                 name="phone_number"
//                 placeholder="Enter your phone number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Emergency Number</label>
//               <input
//                 type="text"
//                 name="emergency_contact"
//                 placeholder="Enter emergency contact"
//                 value={formData.emergency_contact}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Enter your address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 placeholder="Enter your pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-300 mb-1">Health Condition</label>
//               <textarea
//                 name="health_condition"
//                 placeholder="Enter any health conditions or concerns"
//                 value={formData.health_condition}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                 rows={3}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         {/* Navigation Links */}
//         <p className="text-gray-300 text-sm text-center mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-red-400 hover:text-red-600 transition-all">
//             Login
//           </a>
//         </p>
//         <p className="text-white text-sm text-center">
//           By registering, you agree to{" "}
//           <Link href="/terms-policy" className="text-red-400 underline hover:text-red-600 transition-all">
//             Terms & Privacy Policy
//           </Link>
//         </p>
//         <div className="flex justify-center mt-4">
//           <Link
//             href="/"
//             className="text-red-600 hover:text-red-800 transition-all duration-300 flex items-center justify-center"
//           >
//             <Home className="w-6 h-6 md:w-8 md:h-8 transition-transform transform hover:scale-110" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
//.................................................................................................
// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Home } from "lucide-react";

// export default function RegisterForm() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     age: "",
//     gender: "male",
//     phone: "",
//     emergency: "",
//     address: "",
//     pincode: "",
//     healthCondition: "",
//     profileImage: null as File | null,
//   });

//   const [preview, setPreview] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData({ ...formData, profileImage: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formDataObj = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) formDataObj.append(key, value);
//     });

//     const response = await fetch("/api/register", {
//       method: "POST",
//       body: formDataObj,
//     });

//     if (response.ok) {
//       alert("Registration Successful!");
//       router.push("/dashboard");
//     } else {
//       alert("Error in Registration");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4 ">
//       <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border-2 border-red-600">
//         <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Profile Image Upload */}
//           <div className="flex justify-center">
//             <label className="relative cursor-pointer">
//               <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
//               {preview ? (
//                 <Image src={preview} alt="Profile" width={100} height={100} className="rounded-full border-4 border-gray-400 object-cover" />
//               ) : (
//                 <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-red-600 bg-gray-700">
//                   <span className="text-2xl text-gray-400">📷</span>
//                 </div>
//               )}
//             </label>
//           </div>

//           {/* Form Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {["FullName", "Email", "Age", "Phone", "Emergency number", "Address", "Pincode", "HealthCondition"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   {field.replace(/([A-Z])/g, " $1").trim()}
//                 </label>
//                 <input
//                   type={field === "email" ? "email" : field === "age" || field === "phone" || field === "pincode" ? "number" : "text"}
//                   name={field}
//                   placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
//                   value={formData[field as keyof typeof formData]}
//                   onChange={handleChange}
//                   required={field !== "profileImage"}
//                   className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             ))}

//             {/* Gender Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
//           >
//             Register
//           </button>
//         </form>

//         {/* Navigation Links */}
//         <p className="text-gray-300 text-sm text-center mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-red-400 hover:text-red-600 transition-all">
//             Login
//           </a>
//         </p>
//         <p className="text-white text-sm text-center">
//         By registering, you agree to <Link href="/terms-policy" className="text-red-400 underline hover:text-red-600 transition-all">Terms & Privacy Policy</Link>

//         </p>
//         <div className="flex justify-center mt-4">
//           <Link href="https://flexzone-gym.vercel.app/" className="text-red-600 hover:text-red-800 transition-all duration-300 flex items-center justify-center">
//           <Home className="w-6 h-6 md:w-8 md:h-8 transition-transform transform hover:scale-110" />
          
//           </Link>

//         </div>
        
//       </div>
//     </div>
//   );
// }

