import NavBar from "~/website/navbar/navbar";

import { type NextPage } from "next";
import HomePage from "~/website/home/homePage";

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
};

export default Home;
