import React, { useState, useEffect } from "react";
import top from "./teek.jpg";
import { Link } from "react-router-dom";

const NoteHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <header className="relative w-full  min-h-[100dvh] overflow-hidden">
        <img
          src={top}
          alt="Background Image"
          className="object-cover w-full filter min-h-[100dvh] brightness-80 h-64"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-3xl font-bold mb-4">
            Organize your thoughts. Take better notes.
          </h1>
          <p className="text-xl leading-loose mb-8">
            The all-in-one note-taking app to boost your productivity and
            creativity.
          </p>
          <Link
            to={"/register"}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Get Started for Free
          </Link>
          {isLoggedIn && (
            <Link
              to={"/notes"}
              className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Show My Task
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to={"/login"}
              className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Log In to See Tasks
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default NoteHome;
