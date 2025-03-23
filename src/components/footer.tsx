"use client";

import { Footer } from "flowbite-react";

let getYear = new Date().getFullYear()

export function FooterSection() {
  return (
    <Footer container theme={{ root: { base: "bg-gray-300 shadow md:flex md:items-center md:justify-between w-full p-6" } }}>
      <Footer.Copyright className="items-center mx-auto" href="#" by="Gereja™" year={getYear} />
    </Footer>
  );
}

