// app/login/layout.tsx
export const metadata = {
  title: "Login Page",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
