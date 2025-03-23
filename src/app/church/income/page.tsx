"use client";

import React from "react";
import { Table } from "flowbite-react";
import { ButtonGroup } from "@/components/button";

const IncomeList = () => {
  const transactions = [
    {
      id: 1,
      date: "01/12/2025",
      account: "1.1.1",
      description: "Apple MacBook Pro",
      debit: 10000,
      credit: 30000,
      note: 21,
    },
    {
      id: 2,
      date: "02/12/2025",
      account: "1.1.2",
      description: "Samsung Galaxy S21",
      debit: 20000,
      credit: 40000,
      note: 22,
    },
  ];
  const totalDebit = transactions.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = transactions.reduce((sum, item) => sum + item.credit, 0);
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="flex py-4 mx-2">
        <div className="text-center text-lg uppercase font-bold items-center mx-auto">
          <h1>Laporan Keuangan</h1>
          <h2>Pemasukan</h2>
          <h3>PAROKI "MARIA BUNDA KARMEL" KASONGAN</h3>
        </div>
        <div className="max-h-4">
          <ButtonGroup />
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
          <Table.HeadCell>Kredit</Table.HeadCell>
          <Table.HeadCell>Kode Nota</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.map((item, index) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.account}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.description}
              </Table.Cell>
              <Table.Cell>{item.credit.toLocaleString()}</Table.Cell>
              <Table.Cell>{item.note}</Table.Cell>
              <Table.Cell className="space-x-4">
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Delete
                </a>
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
