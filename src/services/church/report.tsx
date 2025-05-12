const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export type FinanceItem = {
  id: number;
  code: string;
  name: string;
  totalIncome: number;
  totalSpending: number;
};

export type FinanceReportResponse = {
  incomes: FinanceItem[];
  spendings: FinanceItem[];
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

export const getFinanceReport = async (
  startDate?: string,
  endDate?: string,
): Promise<FinanceReportResponse> => {
  const params = new URLSearchParams();

  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const res = await fetch(`${API_BASE}/api/finance?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil data finance");

  const json = await res.json();

  return {
    incomes: json.data.incomes,
    spendings: json.data.spendings,
  };
};
