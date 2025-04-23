"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import SpendingCodeAccount from "../../spendingtype/page";
import { createSpending, getSpendingType } from "@/services/church/spending";

interface SpendingType {
  id: number;
  spendingTypeName: string;
  code: string;
  description: string;
  bill: string;
  billNumber: string;
}

const CreateSpending = () => {
  const [spendingTypeList, setSpendingTypeList] = useState<SpendingType[]>([]);
  const [notaFile, setNotaFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    tanggal: "",
    kodeAkun: "",
    kredit: "",
    keterangan: "",
    kodeNota: "",
    nota: "",
  });

  useEffect(() => {
    getSpendingType()
      .then((data: any) => setSpendingTypeList(data))
      .catch((err) => console.error("Error fetching spending types:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, kodeAkun: value }));
  };

  // Handle upload image
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        console.error("File bukan gambar!");
        return;
      }

      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, nota: url }));
      setNotaFile(file); // ✅ simpan file asli ke state
    }
  };

  useEffect(() => {
    return () => {
      if (form.nota) {
        URL.revokeObjectURL(form.nota); // Membersihkan URL
      }
    };
  }, [form.nota]);

  //Handle cancel image upload
  const handleCancelImage = () => {
    setForm((prev) => ({
      ...prev,
      nota: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedAccount = spendingTypeList.find(
      (acc) => acc.code === form.kodeAkun,
    );

    console.log(selectedAccount);

    if (!selectedAccount) {
      console.error("Kode akun tidak valid");
      alert("Kode akun tidak valid. Silakan pilih kembali.");
      return;
    }

    const payload = {
      detail: form.keterangan,
      funds: parseFloat(form.kredit),
      bill: notaFile, // kirim file, bukan blob URL
      billNumber: form.kodeNota,
      date: new Date(form.tanggal).toISOString(),
      spendingTypeId: selectedAccount.id,
      code: selectedAccount.code,
      description: selectedAccount.description,
      spendingTypeName: selectedAccount.spendingTypeName,
    };

    try {
      await createSpending(payload);
      alert("Data pengeluaran berhasil disimpan");

      setForm({
        tanggal: "",
        kodeAkun: "",
        kredit: "",
        keterangan: "",
        nota: "",
        kodeNota: "",
      });
      setNotaFile(null); // reset file
    } catch (error) {
      console.error("Gagal menyimpan data pengeluaran:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="flex flex-col-2 p-4 w-full">
      <div className="w-1/2 mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <SpendingCodeAccount />
      </div>
      <div className="w-1/3 h-fit mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Input Pengeluaran
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <Label htmlFor="tanggal" value="Tanggal" />
            <TextInput
              id="tanggal"
              name="tanggal"
              type="date"
              required
              onChange={handleChange}
              value={form.tanggal}
            />
          </div>
          <div>
            <Label htmlFor="kodeAkun" value="Kode Akun" />
            <Select
              id="kodeAkun"
              name="kodeAkun"
              required
              value={form.kodeAkun}
              onChange={handleSelectChange}
            >
              <option value="">-- Pilih Kode Akun --</option>
              {spendingTypeList?.map((akun) => (
                <option key={akun.id} value={akun.code}>
                  {akun.code} - {akun.spendingTypeName}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="kredit" value="Kredit" />
            <TextInput
              id="kredit"
              name="kredit"
              type="number"
              required
              onChange={handleChange}
              value={form.kredit}
            />
          </div>
          <div>
            <Label htmlFor="keterangan" value="Keterangan" />
            <TextInput
              id="keterangan"
              name="keterangan"
              placeholder="Keterangan"
              value={form.keterangan}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="nomorNota" value="Nomor Nota" />
            <TextInput
              id="kodeNota"
              name="kodeNota"
              placeholder="Nomor Nota"
              value={form.kodeNota}
              onChange={handleChange}
            />
            {form.nota && (
              <div className="relative">
                <img
                  src={form.nota}
                  alt="Preview"
                  style={{ width: "200px" }}
                  className="mt-2 h-auto border rounded shadow-lg"
                />
                <button
                  onClick={handleCancelImage}
                  className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="file-upload">
              Upload Nota
            </Label>
            <FileInput id="nota" name="nota" onChange={handleUploadImage} />
          </div>
          <div className="md:col-span-2 text-right">
            <Button color="blue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSpending;
