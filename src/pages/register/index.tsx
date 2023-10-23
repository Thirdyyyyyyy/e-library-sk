import type { NextPage } from "next";
import React from "react";
import NavBar from "~/website/navbar/navbar";
import SignUpPage from "~/website/register/SignUpPage";

const Register: NextPage = () => {
  return (
    <>
    <NavBar/>
      <SignUpPage />
    </>
  );
};

export default Register;
