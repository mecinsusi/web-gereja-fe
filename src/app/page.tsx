// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // this will redirect instantly to /login
}
