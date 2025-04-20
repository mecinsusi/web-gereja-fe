// components/ClientNavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { NavbarSection } from "@/components/navbar";

export default function ClientNavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/login") || pathname.startsWith("/register");

  if (hideNavbar) return null;

  return (
    <header>
      <NavbarSection />
    </header>
  );
}

