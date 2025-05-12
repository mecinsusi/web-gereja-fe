"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import IncomeCodeAccount from "../page";
import { createIncomeCode } from "@/services/church/income";

const CreateIncomeCode = () => {
  const [form, setForm] = useState({
    kodeAkun: "",
    keterangan: "",
    deskripsi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Logic untuk simpan ke backend di sini
    const payload = {
      incomeCodeName: form.keterangan,
      description: form.deskripsi,
      code: form.kodeAkun,
    };
    try {
      await createIncomeCode(payload);
      alert("Kode akun berhasil disimpan");
      setForm({
        kodeAkun: "",
        deskripsi: "",
        keterangan: "",
      });
    } catch (error) {
      console.error("Gagal menyimpan kode akun:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="flex flex-col-2 p-4 gap-12 w-full">
      <div className="w-1/2 mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <IncomeCodeAccount />
      </div>
      <div className="w-1/2 mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Input Pemasukan</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <Label htmlFor="kodeAkun" value="Kode Akun" />
            <TextInput
              id="kodeAkun"
              name="kodeAkun"
              type="string"
              required
              placeholder="Contoh: 1.1"
              onChange={handleChange}
              value={form.kodeAkun}
            />
          </div>
          <div>
            <Label htmlFor="keterangan" value="Keterangan" />
            <TextInput
              id="keterangan"
              name="keterangan"
              type="string"
              required
              onChange={handleChange}
              value={form.keterangan}
            />
          </div>
          <div>
            <Label htmlFor="deskripsi" value="Deskripsi" />
            <TextInput
              id="deskripsi"
              name="deskripsi"
              type="string"
              required
              onChange={handleChange}
              value={form.deskripsi}
            />
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

export default CreateIncomeCode;
