"use client";

import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { ButtonGroup } from "@/components/button";
import { getIncome, deleteIncome } from "@/services/church/income";

const IncomeList = () => {
  const [incomeList, setIncomeList] = useState<any[]>([]);
  const totalCredit = incomeList.reduce(
    (sum, item: any) => sum + item.funds,
    0,
  );

  // Fetch kode akun saat pertama kali render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getIncome();
      setIncomeList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus pemasukan ini?")) {
      try {
        await deleteIncome(id);
        setIncomeList((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    }
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="flex py-4 mx-2">
        <div className="text-center text-lg uppercase font-bold items-center mx-auto">
          <h1>Laporan Keuangan</h1>
          <h2>Pemasukan</h2>
          <h3>PAROKI "MARIA BUNDA KARMEL" KASONGAN</h3>
        </div>
        <div className="max-h-4">
          <ButtonGroup
            tableName="Input Pemasukan"
            path="/church/income/create"
          />
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
          <Table.HeadCell>Kredit</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {incomeList?.map((item: any, index) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                {new Date(item.createAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.churchIncomeTypeIdRel?.code || "-"}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.detail}
              </Table.Cell>
              <Table.Cell>{item.funds.toLocaleString()}</Table.Cell>
              <Table.Cell className="space-x-4">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row className="bg-gray-200 font-semibold">
            <Table.Cell colSpan={4} className="text-right">
              Jumlah
            </Table.Cell>
            <Table.Cell>{totalCredit.toLocaleString()}</Table.Cell>
            <Table.Cell colSpan={2}></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default IncomeList;
