
// "use client";
// import { useRouter } from "next/navigation";

// interface NavbarProps {
//   toggleSidebar: () => void;
// }

// export default function Navbar({ toggleSidebar }: NavbarProps) {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     router.replace("/login");
//   };

//   return (
//     <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
//       {/* Menu Button (visible on small screens) */}
//       <button onClick={toggleSidebar} className="md:hidden text-white">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>

//       {/* Logo */}
//       <h1 className="text-white text-lg">FLEX ZONE GYM</h1>

//       {/* Logout Button */}
//       <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
//         Logout
//       </button>
//     </nav>
//   );
// }
"use client";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login");
  };

  return (
    <nav className="w-full bg-gray-900 px-6 py-4 flex justify-between items-center shadow-md">
      {/* Menu Button (Visible on Small Screens) */}
      <button onClick={toggleSidebar} className="md:hidden text-white hover:text-gray-300 transition">
        <Menu size={26} />
      </button>

      {/* Logo */}
      <h1 className="text-white text-xl font-bold tracking-wide">FLEX ZONE GYM</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm"
      >
        Logout
      </button>
    </nav>
  );
}
