"use client";

import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { ButtonGroup } from "@/components/button";
import { getIncome, deleteIncome } from "@/services/church/income";

export enum FundsTypeLabel {
  CHURCH = "Gereja",
  STORE = "Toko",
  FARM = "Peternakan",
}

const IncomeList = () => {
  const [incomeList, setIncomeList] = useState<any[]>([]);
  const [filteredIncomeList, setFilteredIncomeList] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [accountCodeFilter, setAccountCodeFilter] = useState("");

  const totalCredit = filteredIncomeList.reduce(
    (sum, item) => sum + item.funds,
    0,
  );

  useEffect(() => {
    getIncome()
      .then((data) => {
        setIncomeList(data);

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

        setFilteredIncomeList(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus pemasukan ini?")) {
      try {
        await deleteIncome(id);
        const updated = incomeList.filter((item) => item.id !== id);
        setIncomeList(updated);
        setFilteredIncomeList(updated);
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    }
  };

  const applyDateFilter = () => {
    let filtered = [...incomeList];

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

    setFilteredIncomeList(filtered);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setAccountCodeFilter("");
    setFilteredIncomeList(incomeList);
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
          <h2>Pemasukan {getDisplayMonth()}</h2>
          <h3>PAROKI "MARIA BUNDA KARMEL" KASONGAN</h3>
        </div>
        <div className="max-h-4">
          <ButtonGroup
            tableName="Input Pemasukan"
            path="/church/income/create"
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
                incomeList.map((item) => item.churchIncomeCodeIdRel?.code),
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
          <Table.HeadCell>Debit</Table.HeadCell>
          <Table.HeadCell>Nomor Nota</Table.HeadCell>
          <Table.HeadCell>Nota</Table.HeadCell>
          <Table.HeadCell>Aksi</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredIncomeList.map((item: any, index) => (
            <Table.Row key={item.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                {new Date(item.createAt).toLocaleDateString("id-ID")}
              </Table.Cell>
              <Table.Cell>
                {FundsTypeLabel[item.fundsType as keyof typeof FundsTypeLabel]}
              </Table.Cell>
              <Table.Cell>{item.churchIncomeCodeIdRel?.code || "-"}</Table.Cell>
              <Table.Cell>{item.detail}</Table.Cell>
              <Table.Cell>{item.funds.toLocaleString("id-ID")}</Table.Cell>
              <Table.Cell>{item.billNumber}</Table.Cell>
              <Table.Cell>
                {item.bill ? (
                  <a href={item.bill} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.bill}
                      alt="Nota"
                      className="h-16 w-auto object-contain border rounded"
                    />
                  </a>
                ) : (
                  <span className="text-gray-500 italic">-</span>
                )}
              </Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row className="bg-gray-100 font-semibold">
            <Table.Cell colSpan={5} className="text-right">
              Jumlah
            </Table.Cell>
            <Table.Cell>{totalCredit.toLocaleString("id-ID")}</Table.Cell>
            <Table.Cell colSpan={3}></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default IncomeList;
