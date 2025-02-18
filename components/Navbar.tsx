"use client";


export default function Navbar() {
  

  const handleLogout = () => {
    // Clear user session (localStorage)
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to home page after logout and replace the current page in history
    window.location.replace("/"); // This will replace the current page with the home page
  };

  return (
    <nav className="w-full bg-primary p-4 flex justify-between">
      <h1 className="text-white text-lg font-bold">Gym Management</h1>
      <button
        onClick={handleLogout}
        className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}

