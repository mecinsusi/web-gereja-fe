"use client";

import { FinanceItem, getFinanceReport } from "@/services/church/report";
import { exportToCSV } from "@/utils/export";
import { Button, Label, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

// Perluas FinanceItem agar punya "type"
type MergedFinanceItem = FinanceItem & {
  type: "income" | "spending";
  debit: number;
  credit: number;
};

const FinanceReport = () => {
  const [financeList, setFinanceList] = useState<MergedFinanceItem[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getFinanceReport(startDate, endDate)
      .then((data) => {
        const mergedList: MergedFinanceItem[] = [
          ...data.incomes.map((item) => ({
            ...item,
            type: "income" as const,
            debit: Number(item.totalIncome || 0),
            credit: 0,
          })),
          ...data.spendings.map((item) => ({
            ...item,
            type: "spending" as const,
            debit: 0,
            credit: Number(item.totalSpending || 0),
          })),
        ];
        setFinanceList(mergedList);
      })
      .catch((err) => console.error(err));
  }, [startDate, endDate]);

  const totalDebit = financeList.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = financeList.reduce((sum, item) => sum + item.credit, 0);
  const totalBalance = totalDebit - totalCredit;

  const handleExport = () => {
    const masterAccountList = [
      ...new Map(
        financeList.map((item) => [
          item.code,
          {
            code: item.code,
            name: item.name,
            category: item.type || item.name,
          },
        ]),
      ).values(),
    ];

    console.log(financeList);
    const aggregatedMap = new Map<string, { debit: number; credit: number }>();

    financeList.forEach((item) => {
      if (!aggregatedMap.has(item.code)) {
        aggregatedMap.set(item.code, { debit: 0, credit: 0 });
      }

      const current = aggregatedMap.get(item.code)!;
      current.debit += item.debit;
      current.credit += item.credit;
    });

    const mergedList = masterAccountList.map((acc) => ({
      code: acc.code,
      category: acc.category,
      name: acc.name,
      debit: aggregatedMap.get(acc.code)?.debit || 0,
      credit: aggregatedMap.get(acc.code)?.credit || 0,
    }));

    const headers = [
      "KODE AKUN",
      "NAMA TRANSAKSI",
      "PENERIMAAN",
      "PENGELUARAN",
    ];
    mergedList.sort((a, b) => a.code.localeCompare(b.code));

    const rows = mergedList.map((item) => [
      item.code,
      item.name,
      item.debit ? formatCurrency(item.debit) : "",
      item.credit ? formatCurrency(item.credit) : "",
    ]);

    const totalDebit = mergedList.reduce(
      (sum, item) => sum + (item.debit || 0),
      0,
    );
    const totalCredit = mergedList.reduce(
      (sum, item) => sum + (item.credit || 0),
      0,
    );
    const total = totalDebit - totalCredit;

    const kop = [
      ["LAPORAN KEUANGAN"],
      ["BULAN TAHUN"],
      ['PAROKI "MARIA BUNDA KARMEL" KASONGAN'],
      [],
    ];

    const jumlahRow = [
      "",
      "JUMLAH",
      formatCurrency(totalDebit),
      formatCurrency(totalCredit),
    ];
    const totalRow = ["", "TOTAL SALDO", formatCurrency(total)];

    const fullData = [...kop, headers, ...rows, jumlahRow, totalRow];

    exportToCSV("laporan_keuangan", [], fullData);
  };

  function formatCurrency(value: number): string {
    return `Rp ${value.toLocaleString("id-ID")}`;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="text-center text-lg uppercase font-bold items-center mx-auto pt-4 pb-8">
        <h1>Transaksi Kas Harian</h1>
        <h2>Bulan Tahun</h2>
        <h3>PAROKI "MARIA BUNDA KARMEL" KASONGAN</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
        <div className="flex gap-2 items-end">
          <div>
            <Label htmlFor="startDate" value="Dari tanggal" />
            <TextInput
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endDate" value="Sampai tanggal" />
            <TextInput
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleExport} color="success">
          Download CSV
        </Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Nama Transaksi</Table.HeadCell>
          <Table.HeadCell>Debit</Table.HeadCell>
          <Table.HeadCell>Kredit</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {financeList.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.code}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.debit.toLocaleString("id-ID")}</Table.Cell>
              <Table.Cell>{item.credit.toLocaleString("id-ID")}</Table.Cell>
            </Table.Row>
          ))}
          <Table.Row className="font-semibold bg-gray-100">
            <Table.Cell colSpan={2} className="text-right">
              Jumlah
            </Table.Cell>
            <Table.Cell>{formatCurrency(totalDebit)}</Table.Cell>
            <Table.Cell>{formatCurrency(totalCredit)}</Table.Cell>
          </Table.Row>
          <Table.Row className="font-semibold bg-gray-200">
            <Table.Cell colSpan={2} className="text-right">
              Total Saldo
            </Table.Cell>
            <Table.Cell>{formatCurrency(totalBalance)}</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default FinanceReport;
