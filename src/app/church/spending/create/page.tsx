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
  const [form, setForm] = useState({
    tanggal: "",
    kodeAkun: "",
    debit: "",
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
      funds: parseFloat(form.debit),
      bill: form.nota,
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
        debit: "",
        keterangan: "",
        nota: "",
        kodeNota: "",
      });
    } catch (error) {
      console.error("Gagal menyimpan data pengeluaran:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="flex flex-col-2 p-4 gap-12 w-full">
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
            <Label htmlFor="debit" value="Debit" />
            <TextInput
              id="debit"
              name="debit"
              type="number"
              required
              onChange={handleChange}
              value={form.debit}
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
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="file-upload">
              Upload Nota
            </Label>
            <FileInput id="nota" />
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
