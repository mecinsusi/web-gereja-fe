"use client";

import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { getIncomeCode, deleteIncomeCode } from "@/services/church/income";
import { ButtonGroup } from "@/components/button";

const IncomeCodeAccount = () => {
  const [incomeCodeList, setIncomeCodeList] = useState<any[]>([]);

  // Fetch kode akun saat pertama kali render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getIncomeCode();
      setIncomeCodeList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus pemasukan ini?")) {
      try {
        await deleteIncomeCode(id);
        setIncomeCodeList((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    }
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="flex py-4 mx-2">
        <div className="text-center text-lg uppercase font-bold items-center mx-auto">
          <h1>Kode Akun</h1>
          <h2>Pemasukan</h2>
        </div>
        <div>
          <ButtonGroup
            tableName="Input Kode Akun"
            path="/church/incometype/create"
          />
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {incomeCodeList?.map((item: any, index) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.code}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.incomeCodeName}
              </Table.Cell>
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
        </Table.Body>
      </Table>
    </div>
  );
};

export default IncomeCodeAccount;
