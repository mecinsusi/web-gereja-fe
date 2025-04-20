const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

//fetch API for both income and spending
export const getFinance = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/api/churchincome/finance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data finance");
  const json = await res.json();
  return json.data.finance; // pastikan return ini array
};
