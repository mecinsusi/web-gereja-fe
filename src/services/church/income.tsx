// services/incomeService.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

interface CreateIncomeType {
  incomeTypeName: string;
  description: string;
  code: string;
}

export const getIncome = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/api/churchincome`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data pemasukan");
  const json = await res.json();
  return json.data.income; // pastikan return ini array
};

export const getIncomeType = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/api/churchincometype`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data kode akun pemasukan");
  const json = await res.json();
  return json.data.incomeType; // pastikan return ini array
};

export async function createIncome(data: any) {
  const formData = new FormData();

  formData.append("detail", data.detail);
  formData.append("funds", data.funds);
  formData.append("billNumber", data.billNumber);
  formData.append("date", data.date);
  formData.append("spendingTypeId", data.incomeTypeId);
  formData.append("code", data.code);
  formData.append("description", data.description);
  formData.append("spendingTypeName", data.incomeTypeName);

  if (data.bill instanceof File) {
    formData.append("bill", data.bill); // untuk upload file
  }

  const res = await fetch(`${API_BASE}/api/churchincome/create`, {
    method: "POST",
    headers: {
      Authorization: `${token()}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal menyimpan pemasukan");
  }

  return await res.json();
}

export const deleteIncome = async (id: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchincome/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal menghapus pemasukan");
  return res.json();
};

export const createIncomeType = async (
  data: CreateIncomeType,
): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchincometype/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menyimpan pemasukan");
  return res.json();
};

export const deleteIncomeType = async (id: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchincometype/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });

  if (!res.ok) throw new Error("Gagal menghapus pemasukan");
  return res.json();
};

export const getIncomeById = async (id: any) => {
  const res = await fetch(`${API_BASE}/api/churchincome/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal fetch data pemasukan");
  return res.json();
};
