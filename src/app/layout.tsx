//Main layout
"use client"

import { NavbarSection } from "@/components/navbar";
import "../app/globals.css";
import { FooterSection } from "@/components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-display">
        <header><NavbarSection /></header>
        <main>{children}</main>
        <footer><FooterSection /></footer>
      </body>
    </html>
  );
}

