import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Router */}
      <Route path="/" element={<Home />} />
      {/* Login Router */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
