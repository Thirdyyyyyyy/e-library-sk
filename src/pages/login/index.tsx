import type { NextPage } from "next";
import React from "react";
import LoginPage from "~/website/login/LoginPage";
import NavBar from "~/website/navbar/navbar";

const Login: NextPage = () => {
  return (
    <>
    <NavBar/>
      <LoginPage />
    </>
  );
};

export default Login;
