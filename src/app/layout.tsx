// app/layout.tsx
import "../app/globals.css";
import ClientNavbarWrapper from "../components/clientNavbarWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-display">
        <ClientNavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
