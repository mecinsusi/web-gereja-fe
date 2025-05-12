"use client";

import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { ButtonGroup } from "@/components/button";
import { getSpending, deleteSpending } from "@/services/church/spending";
import { FundsTypeLabel, getBillImageUrl } from "@/services/church/income";

const SpendingList = () => {
  const [spendingList, setSpendingList] = useState<any[]>([]);
  const [filteredSpendingList, setFilteredSpendingList] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [accountCodeFilter, setAccountCodeFilter] = useState("");

  const totalDebit = filteredSpendingList.reduce(
    (sum, item: any) => sum + item.funds,
    0,
  );

  useEffect(() => {
    getSpending()
      .then((data) => {
        setSpendingList(data);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const filtered = data.filter((item: any) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === currentMonth &&
            itemDate.getFullYear() === currentYear
          );
        });

        setFilteredSpendingList(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus pemasukan ini?")) {
      try {
        await deleteSpending(id);
        const updated = spendingList.filter((item) => item.id !== id);
        setSpendingList(updated);
        setFilteredSpendingList(updated);
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    }
  };

  const applyDateFilter = () => {
    let filtered = [...spendingList];

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    if (accountCodeFilter) {
      filtered = filtered.filter((item: any) =>
        item.churchIncomeCodeIdRel?.code
          ?.toLowerCase()
          .includes(accountCodeFilter.toLowerCase()),
      );
    }

    setFilteredSpendingList(filtered);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setAccountCodeFilter("");
    setFilteredSpendingList(spendingList);
  };

  const getDisplayMonth = () => {
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
        const endMonth = end.toLocaleString("id-ID", { month: "long" });
        return `${month} - ${endMonth} ${year}`;
      }
    }

    const currentDate = new Date();
    return `${currentDate.toLocaleString("id-ID", {
      month: "long",
    })} ${currentDate.getFullYear()}`;
  };

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="flex py-4 mx-2">
        <div className="text-center text-lg uppercase font-bold items-center mx-auto">
          <h1>Transaksi Kas Harian</h1>
          <h2>Pengeluaran {getDisplayMonth()}</h2>
          <h3>PAROKI "MARIA BUNDA KARMEL" KASONGAN</h3>
        </div>
        <div className="max-h-4">
          <ButtonGroup
            tableName="Input Pengeluaran"
            path="/church/spending/create"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap py-4 mx-2 gap-4 items-end">
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
          <label htmlFor="accountCode" className="block font-bold">
            Kode Akun
          </label>
          <select
            id="accountCode"
            value={accountCodeFilter}
            onChange={(e) => setAccountCodeFilter(e.target.value)}
            className="border p-2 rounded-md text-sm w-24"
          >
            <option value="">Semua</option>
            {[
              ...new Set(
                spendingList.map((item) => item.churchSpendingCodeIdRel?.code),
              ),
            ]
              .filter(Boolean)
              .map((kode) => (
                <option key={kode} value={kode}>
                  {kode}
                </option>
              ))}
          </select>
        </div>
        <div className="flex space-x-2 text-sm">
          <Button color="purple" onClick={applyDateFilter}>
            Terapkan Filter
          </Button>
          <Button color="gray" onClick={resetFilter}>
            Reset
          </Button>
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>Kategori Dana</Table.HeadCell>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
          <Table.HeadCell>Kredit</Table.HeadCell>
          <Table.HeadCell>Nomor Nota</Table.HeadCell>
          <Table.HeadCell>Nota</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {spendingList?.map((item: any, index) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                {new Date(item.createAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {FundsTypeLabel[item.fundsType as keyof typeof FundsTypeLabel]}
              </Table.Cell>
              <Table.Cell>{item.churchSpendingCodeIdRel.code}</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.detail}
              </Table.Cell>
              <Table.Cell>{item.funds.toLocaleString()}</Table.Cell>
              <Table.Cell>{item.billNumber}</Table.Cell>
              <Table.Cell>
                {item.bill ? (
                  <a
                    href={getBillImageUrl(item.bill)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={getBillImageUrl(item.bill)}
                      alt="Nota"
                      className="h-16 w-auto object-contain border rounded"
                    />
                  </a>
                ) : (
                  <span className="text-gray-500 italic">-</span>
                )}
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
          <Table.Row className="bg-gray-200 font-semibold">
            <Table.Cell colSpan={6} className="text-right">
              Jumlah
            </Table.Cell>
            <Table.Cell>{totalDebit.toLocaleString()}</Table.Cell>
            <Table.Cell colSpan={2}></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default SpendingList;
