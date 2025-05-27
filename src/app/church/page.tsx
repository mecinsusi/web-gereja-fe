"use client";

import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { ButtonGroup } from "@/components/button";
import { getFinance } from "@/services/church/report";
import { exportToCSV } from "@/utils/export";
import AccountCodeDropdown from "@/components/dropDown";

const ChurchReport = () => {
  const [financeList, setFinanceList] = useState<any[]>([]);
  const [filteredFinanceList, setFilteredFinanceList] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [accountCodeFilter, setAccountCodeFilter] = useState<string[]>([]);
  const [userFilter, setUserFilter] = useState("");

  // Fetch data saat pertama kali render
  useEffect(() => {
    getFinance()
      .then((data) => {
        setFinanceList(data);

        // Filter data untuk hari ini
        const today = new Date();
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        const filtered = data.filter((item: any) => {
          const itemDate = new Date(item.date);
          return itemDate >= todayStart && itemDate <= todayEnd;
        });

        setFilteredFinanceList(filtered); // Menyimpan data bulan ini
      })
      .catch((err) => console.error(err));
  }, []);

  const totalCredit = filteredFinanceList
    .filter((item: any) => item.type === "spending")
    .reduce((sum, item: any) => sum + Math.abs(item.amount), 0);

  const totalDebit = filteredFinanceList
    .filter((item: any) => item.type === "income")
    .reduce((sum, item: any) => sum + Math.abs(item.amount), 0);

  const totalFunds = totalDebit - totalCredit;

  const formattedFinanceList = filteredFinanceList.map((item: any) => ({
    ...item,
    account: item.category,
    description: item.detail,
    debit: item.type === "income" ? Math.abs(item.amount) : 0,
    credit: item.type === "spending" ? Math.abs(item.amount) : 0,
    note: item.code,
    userName: item.userName,
  }));

  // Fungsi untuk mengaplikasikan filter berdasarkan tanggal
  const applyDateFilter = () => {
    let filtered = [...financeList];

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    if (accountCodeFilter.length > 0) {
      filtered = filtered.filter((item: any) =>
        accountCodeFilter.some(
          (code) => code.toLowerCase() === item.code?.toLowerCase(),
        ),
      );
    }

    if (userFilter) {
      filtered = filtered.filter((item: any) =>
        item.userName?.toLowerCase().includes(userFilter.toLowerCase()),
      );
    }

    setFilteredFinanceList(filtered);
  };

  const filterToday = (data: any[]) => {
    const today = new Date();
    return data.filter((item) => {
      const d = new Date(item.date);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  };

  //Reset
  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setAccountCodeFilter([]);
    setUserFilter("");

    setFilteredFinanceList(filterToday(financeList));
  };

  // Menentukan bulan yang ditampilkan pada header
  const getDisplayMonth = () => {
    // Jika ada filter tanggal, tampilkan bulan dan tahun dari startDate
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const month = start.toLocaleString("id-ID", { month: "long" });
      const year = start.getFullYear();

      if (
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
      ) {
        return `${month} ${year}`;
      } else {
        // Jika start dan end berbeda bulan, tampilkan rentang bulan
        const endMonth = end.toLocaleString("id-ID", { month: "long" });
        return `${month} - ${endMonth} ${year}`;
      }
    }
    // Jika tidak ada filter, tampilkan bulan dan tahun saat ini
    const currentDate = new Date();
    return `${currentDate.toLocaleString("id-ID", { month: "long" })} ${currentDate.getFullYear()}`;
  };

  const handleExport = () => {
    const headers = [
      "No",
      "Tanggal",
      "Kode Akun",
      "Keterangan",
      "Debit",
      "Kredit",
    ];
    const rows = formattedFinanceList.map((item: any, index: number) => [
      index + 1,
      new Date(item.date).toLocaleDateString(),
      item.code,
      item.detail,
      item.debit,
      item.credit,
    ]);

    // Hitung total debit dan kredit
    const totalDebit = formattedFinanceList.reduce(
      (sum: number, item: any) => sum + item.debit,
      0,
    );
    const totalCredit = formattedFinanceList.reduce(
      (sum: number, item: any) => sum + item.credit,
      0,
    );
    const total = totalDebit - totalCredit;

    //Tambahkan kop atau judul laporan
    const kop = [
      ["LAPORAN KEUANGAN"],
      ["BULAN TAHUN"],
      ['PAROKI "MARIA BUNDA KARMEL" KASONGAN'],
      [], // baris kosong sebelum header
    ];

    // Tambahkan baris jumlah dan total
    const jumlahRow = ["", "", "", "Jumlah", totalDebit, totalCredit];
    const totalRow = ["", "", "", "TOTAL", total];

    const fullData = [...kop, headers, ...rows, jumlahRow, totalRow];

    exportToCSV("laporan_keuangan", [], fullData);
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="flex py-4 mx-2">
        <div className="text-center text-lg uppercase font-bold items-center mx-auto pt-4 pb-8">
          <h1>Transaksi Kas Harian</h1>
          <h2>{getDisplayMonth()}</h2>
          <h3>PAROKI "MARIA BUNDA KARMEL" KASONGAN</h3>
        </div>
        <div className="max-h-4  flex flex-col space-y-2">
          <ButtonGroup
            tableName="Input Pemasukan"
            path="/church/income/create"
          />
          <ButtonGroup
            tableName="Input Pengeluaran"
            path="/church/spending/create"
          />
        </div>
      </div>

      {/* Filter Tanggal */}
      <div className="flex py-4 mx-2 gap-4">
        <div className="space-y-2 text-sm">
          <label htmlFor="start" className="block font-bold">
            Dari Tanggal
          </label>
          <input
            type="date"
            id="start"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md text-sm"
          />
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor="end" className="block font-bold">
            Sampai Tanggal
          </label>
          <input
            type="date"
            id="end"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-md text-sm"
          />
        </div>
        <div className="space-y-2 text-sm">
          <label className="block font-bold">Kode Akun</label>
          <AccountCodeDropdown
            financeList={financeList}
            accountCodeFilter={accountCodeFilter}
            setAccountCodeFilter={setAccountCodeFilter}
          />
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor="end" className="block font-bold">
            Nama Admin
          </label>
          <select
            id="userName"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="border p-2 rounded-md text-sm w-20"
          >
            <option value="">Semua</option>
            {[...new Set(financeList.map((item) => item.userName))].map(
              (username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="flex p-2 space-x-6 mt-4 text-sm">
          <Button color="purple" onClick={applyDateFilter}>
            Terapkan Filter
          </Button>
          <Button color="gray" onClick={resetFilter}>
            Reset
          </Button>
          <Button color="blue" onClick={handleExport}>
            Download CSV
          </Button>
        </div>
      </div>

      {/* Tabel Laporan Keuangan */}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>Nama Admin</Table.HeadCell>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
          <Table.HeadCell>Debit</Table.HeadCell>
          <Table.HeadCell>Kredit</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {formattedFinanceList?.map((item: any, index: number) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                {new Date(item.date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{item.userName}</Table.Cell>
              <Table.Cell>{item.code}</Table.Cell>
              <Table.Cell>{item.detail}</Table.Cell>
              <Table.Cell>{item.debit.toLocaleString()}</Table.Cell>
              <Table.Cell>{item.credit.toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
          <Table.Row className="bg-gray-200 font-semibold border-t-2">
            <Table.Cell colSpan={5} className="text-right">
              Jumlah
            </Table.Cell>
            <Table.Cell>{totalDebit.toLocaleString()}</Table.Cell>
            <Table.Cell>{totalCredit.toLocaleString()}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-gray-200 font-semibold">
            <Table.Cell colSpan={5} className="text-right">
              TOTAL
            </Table.Cell>
            <Table.Cell>{totalFunds.toLocaleString()}</Table.Cell>
            <Table.Cell colSpan={1}></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default ChurchReport;
