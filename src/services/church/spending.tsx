// services/spendingService.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

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

export async function createSpending(data: any) {
  const formData = new FormData();

  formData.append("detail", data.detail);
  formData.append("funds", data.funds);
  formData.append("billNumber", data.billNumber);
  formData.append("date", data.date);
  formData.append("spendingTypeId", data.spendingTypeId);
  formData.append("code", data.code);
  formData.append("description", data.description);
  formData.append("spendingTypeName", data.spendingTypeName);

  if (data.bill instanceof File) {
    formData.append("bill", data.bill); // untuk upload file
  }

  const res = await fetch(`${API_BASE}/api/churchspending/create`, {
    method: "POST",
    headers: {
      Authorization: `${token()}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal menyimpan pengeluaran");
  }

  return await res.json();
}

export const uploadNotaImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/churchspending/upload`, {
    method: "POST",
    headers: {
      Authorization: `${token()}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Gagal upload gambar nota");

  const data = await res.json();
  return data.url; // Ini yang akan disimpan ke form.nota
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
