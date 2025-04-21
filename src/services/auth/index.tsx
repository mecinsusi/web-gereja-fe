// services/authService.ts

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface LoginData {
  email: string;
  password: string;
}
export const login = async (data: LoginData): Promise<{ token: string }> => {
  console.log("API BASE =", process.env.NEXT_PUBLIC_API_BASE_URL);
  const res = await fetch(`${API_BASE}/api/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.meta?.message || "Gagal login");
  }

  const json = await res.json();
  const token = json.meta?.access_token;

  if (!token) throw new Error("Token tidak ditemukan di response");

  // Simpan token ke localStorage
  localStorage.setItem("access_token", token);

  return { token };
};
