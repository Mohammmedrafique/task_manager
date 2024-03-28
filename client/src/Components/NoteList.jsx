// NoteList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await fetch(
          "https://better-wasp-overshirt.cyclic.app/notes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await fetch(
        `https://better-wasp-overshirt.cyclic.app/notes/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // If delete request is successful, remove the note from state
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        // Handle error response from the server
        const data = await response.json();
        throw new Error(data.message || "Failed to delete note.");
      }
    } catch (error) {
      // Handle any errors during the delete operation
      console.error("Error deleting note:", error.message);
      alert("An error occurred while deleting the note. Please try again.");
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-4">Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto max-w-sm w-full" key={note._id}>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700">{note.content}</p>
            </div>
            <div className="flex justify-end p-4">
              <Link to={`/update/${note._id}`}>
                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Edit
                </button>
              </Link>
              <button onClick={() => handleDelete(note._id)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
