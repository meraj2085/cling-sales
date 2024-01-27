"use client";
import React from "react";
import Navbar from "../../components/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
