"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "./ui/button";
import { signOut } from "@/app/login/actions";

export default function Navbar() {
  const pathname = usePathname(); // Get current route

  const navItems = [
    { name: "Leaderboard", href: "/" },
    { name: "Selections", href: "/selections" },
    { name: "Brackets", href: "/brackets" }
  ];

  return (
    <nav className="w-full bg-white shadow-md mb-4">
      <div className="max-w-4xl mx-auto flex justify-center gap-6 p-4 items-center">
        {navItems.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={clsx(
              "text-gray-600 hover:text-gray-900 transition-all pb-1",
              pathname === href && "text-[#CA50EF] border-b-2 border-[#CA50EF]"
            )}
          >
            {name}
          </Link>
        ))}
        <p onClick={signOut}
            className={clsx(
              "text-gray-600 hover:text-gray-900 transition-all bg-gray-100 rounded p-2 text-center align-center"
            )}>
  
           Logout
</p>
      </div>
    </nav>
  );
}