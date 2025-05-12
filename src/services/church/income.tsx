// services/incomeService.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export enum FundsTypeLabel {
  CHURCH = "Gereja",
  STORE = "Toko",
  FARM = "Peternakan",
}

interface CreateIncomeCode {
  incomeCodeName: string;
  description: string;
  code: string;
}

export enum Type {
  CHURCH = "CHURCH",
  STORE = "STORE",
  FARM = "FARM",
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

export const getIncomeCode = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/api/churchincomecode`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil data kode akun pemasukan");
  const json = await res.json();
  return json.data.incomeCode; // pastikan return ini array
};

export const getBillImageUrl = (filename: string) => {
  return `${API_BASE}/${filename}`;
};

export async function createIncome(data: any) {
  const formData = new FormData();

  formData.append("detail", data.detail);
  formData.append("funds", data.funds);
  formData.append("billNumber", data.billNumber);
  formData.append("date", data.date);
  formData.append("incomeCodeId", data.incomeCodeId);
  formData.append("code", data.code);
  formData.append("fundsType", data.fundsType);
  formData.append("description", data.description);
  formData.append("incomeCodeName", data.incomeCodeName);

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

export const createIncomeCode = async (
  data: CreateIncomeCode,
): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchincomecode/create`, {
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

export const deleteIncomeCode = async (id: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/api/churchincomecode/delete/${id}`, {
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
