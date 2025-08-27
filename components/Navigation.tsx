"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/interview", label: "Interview Me" },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="logo"
          height={30}
          width={30}
          className="rounded-full object-cover"
        />
        <h2 className="text-primary-100">Deep Intelligence</h2>
      </Link>

      <div className="flex items-center gap-8 max-sm:gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${pathname === item.href ? "active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
