import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

// Base component that maintains the navbar throughout the page.
export const Layout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};