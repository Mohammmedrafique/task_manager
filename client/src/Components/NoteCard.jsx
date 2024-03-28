// NoteCard.js
import React, { useState } from "react";
// import { Link } from "react-router-dom";

export const NoteCard = ({ _id, title, content, onUpdate }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const response = await fetch(
        `https://better-wasp-overshirt.cyclic.app/notes/update/${_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
        }
      );

      if (response.ok) {
        // If update request is successful, invoke onUpdate to update UI
        onUpdate(_id, editedTitle, editedContent);
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto max-w-sm w-full">
      <div className="p-4">
        <input
          type="text"
          className="w-full mb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          className="w-full h-32 mb-4 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-blue-500"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end p-4">
        <button
          onClick={handleUpdate}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </div>
    </div>
  );
};
