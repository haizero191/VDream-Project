import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Router */}
      <Route path="/" element={<Home />} />
      {/* Login Router */}
      <Route path="/login" element={<Login />} />
      {/* Login Router */}
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
