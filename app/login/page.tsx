// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-hot-toast";
// import useUserStore from "@/stores/userStore";
// import { Home } from "lucide-react";

// // Make sure you've created this file based on previous code
// // stores/userStore.ts with the simplified version

// export default function Login() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const router = useRouter();
  
//   const setAuth = useUserStore(state => state.setAuth);
  
//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/login`,
//         { email, password }
//       );
      
//       // Set user and token in the Zustand store
//       setAuth(data.token, data.user);
      
//       // Set token for future API requests
//       // axios.defaults.headers.common['Authorization'] = Bearer ${data.token};
      
//       // Show success message
//       // toast.success(data.message || "Login successful!");
//       alert("login successfull")
      
//       // Navigate to the appropriate dashboard based on user role
//       router.push(`/dashboard/${data.user.role}`);
//     } catch (error) {
//       const err = error as AxiosError<{ message?: string }>;
//       toast.error(err.response?.data?.message || "Invalid credentials");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="flex items-center justify-center h-screen bg-dark">
//       <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
//         <h2 className="text-white text-2xl font-semibold mb-5 text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <input 
//             type="email" 
//             placeholder="Email" 
//             className="input" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             disabled={isLoading}
//             required 
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             className="input mt-4" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             disabled={isLoading}
//             required 
//           />
//           <button 
//             type="submit" 
//             className="button mt-6 w-full flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? <div className="spinner"></div>: "Login"}
//           </button>
//         </form>
//         <p className="text-gray-300 text-sm mt-3 text-center font-roboto">
//           Don&apos;t have an account? <Link href="/register" className="text-primary">Register</Link>
//         </p>
//         <p className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2"><Link href="https://flexzone-gym.vercel.app/"className="home-button text-red-600 hover:text-red-800 transition-all duration-300 " ><Home className="w-8 h-8" /></Link></p>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import useUserStore from "@/stores/userStore";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const setAuth = useUserStore(state => state.setAuth);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/login`,
        { email, password },{withCredentials:true}
      );
      
      setAuth(data.token, data.user);
      alert("Login successful!");
      router.push(`/dashboard/${data.user.role}`);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }} 
        className="relative bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96 transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-white text-2xl font-semibold mb-5 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            className="input transition-all duration-300 focus:ring-2 focus:ring-primary" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input mt-4 transition-all duration-300 focus:ring-2 focus:ring-primary" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
            required 
          />
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            type="submit" 
            className="button mt-6 w-full flex items-center justify-center transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "Login"}
          </motion.button>
        </form>
        <p className="text-gray-300 text-sm mt-3 text-center font-roboto">
          Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
        </p>
        
        {/* Home Button Inside the Box */}
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          className="flex justify-center mt-5"
        >
          <Link href="https://flexzone-gym.vercel.app/" className="text-red-600 hover:text-red-800 transition-all duration-300">
            <Home className="w-10 h-10" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-hot-toast";

// export default function Login() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "https://7f6e-202-88-252-51.ngrok-free.app/v1/api/login"


//         ,
//         { email, password }
        
//       );

//       router.push(`/dashboard/${data.user.role}`);
//     } catch (error) {
//       const err = error as AxiosError<{ message?: string }>;
//       toast.error(err.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-dark">
//       <div className="bg-white/10 p-10 rounded-xl border border-primary backdrop-blur-lg shadow-lg w-96">
//         <h2 className="text-white text-2xl font-semibold mb-5 text-center">Login</h2>
//         <form onSubmit={handleLogin}>
//           <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input type="password" placeholder="Password" className="input mt-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <button type="submit" className="button mt-6">Login</button>
//         </form>
//         <p className="text-gray-300 text-sm mt-3 text-center">
//           Don&apos;t have an account? <Link href="/register" className="text-primary">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }


