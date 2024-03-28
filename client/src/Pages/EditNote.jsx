// EditNote.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams(); // Get the note ID from the URL
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await fetch(
          `https://better-wasp-overshirt.cyclic.app/notes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch note");
        }

        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await fetch(
        `https://better-wasp-overshirt.cyclic.app/notes/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: note.title,
            content: note.content,
          }),
        }
      );

      if (response.ok) {
        // Redirect to the note list after successful update
        navigate("/");
      } else {
        // Handle error response from the server
        const data = await response.json();
        throw new Error(data.message || "Failed to update note.");
      }
    } catch (error) {
      // Handle any errors during the update operation
      console.error("Error updating note:", error.message);
      alert("An error occurred while updating the note. Please try again.");
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center my-4">Edit Note</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
