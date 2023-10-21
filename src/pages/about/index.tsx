import type { NextPage } from "next";
import React from "react";
import About from "~/website/about/About";
import NavBar from "~/website/navbar/navbar";

const Login: NextPage = () => {
  return (
    <>
      <NavBar />
      <About />
    </>
  );
};

export default Login;
