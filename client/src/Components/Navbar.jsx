import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page after logout
  };

  const isLoggedIn = !!localStorage.getItem("token"); // Check if the token exists

  return (
    <div className="flex border-b border-gray-300 items-center px-4 h-16">
      <h2 className="text-xl font-semibold">Task Manager</h2>
      <nav className="ml-auto space-x-4">
        <Link to={"/"} className="text-blue-500 hover:text-blue-700">Home</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700">Logout</button>
        ) : (
          <Link to={"/login"} className="text-blue-500 hover:text-blue-700">Login</Link>
        )}
        <Link to={"/addnote"}>Add Note</Link>
      </nav>
    </div>
  );
};
