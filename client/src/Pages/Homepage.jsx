import React from "react";
import { NoteList } from "../Components/NoteList";
import NoteHome from "../Components/NoteHome";
import Footer from "./Footer";

export const Homepage = () => {
  return (
    <div className="w-screenmax-w-screen w-full">
      <NoteHome />
      <Footer />
    </div>
  );
};
