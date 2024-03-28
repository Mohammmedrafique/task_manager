import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
// import { EditBook } from "./EditBook";
import { Homepage } from "./Homepage";
import { PrivateRoute } from "../Components/PrivateRoute";
import { Register } from "./Register";
import { AddNote } from "../Components/AddNote";

import EditNote from "./EditNote";

export const MainRoutes = () => {
  return (
    <Routes>
      {/* Provide all Routes here */}
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/addnote" element={<AddNote />}></Route>
      <Route path="/update/:id" element={<EditNote />} />
      <Route
        path="/edit-book/:id"
        element={<PrivateRoute>{/* <EditBook /> */}</PrivateRoute>}
      ></Route>
    </Routes>
  );
};
