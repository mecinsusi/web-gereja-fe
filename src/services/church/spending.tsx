// services/spendingService.ts
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

interface CreateSpending {
  date: string;
  funds: number;
  detail: string;
  spendingTypeId: number;
  spendingTypeName: string;
  bill: string;
  billNumber: string;
  description: string;
  code: string;
}

interface CreateSpendingType {
  spendingTypeName: string;
  description: string;
  code: string;
}
export const getSpending = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/api/churchspending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data pengeluaran");
  const json = await res.json();
  return json.data.spending; // pastikan return ini array
};

export const getSpendingType = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/api/churchspendingtype`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data kode akun pengeluaran");
  const json = await res.json();
  return json.data.spendingType; // pastikan return ini array
};

export const createSpending = async (data: CreateSpending): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchspending/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menyimpan pengeluaran");
  return res.json();
};

export const deleteSpending = async (id: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchspending/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal menghapus pemasukan");
  return res.json();
};

export const createSpendingType = async (
  data: CreateSpendingType,
): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchspendingtype/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menyimpan kode akun pengeluaran");
  return res.json();
};

export const deleteSpendingType = async (id: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchspendingtype/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal menghapus pemasukan");
  return res.json();
};
