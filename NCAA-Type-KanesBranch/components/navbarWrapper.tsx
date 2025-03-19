"use client"; // Ensure this is a client component

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname === "/login") return null; // Hide Navbar on login page

  return <Navbar />;
}
