"use client";

import React, { useState, useRef, useEffect } from "react";

const AccountCodeDropdown = ({
  financeList,
  accountCodeFilter,
  setAccountCodeFilter,
}: {
  financeList: any[];
  accountCodeFilter: string[];
  setAccountCodeFilter: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uniqueCodes = [
    ...new Set(financeList.map((item) => item.code).filter(Boolean)),
  ];

  const toggleCode = (code: string) => {
    if (accountCodeFilter.includes(code)) {
      setAccountCodeFilter(accountCodeFilter.filter((c) => c !== code));
    } else {
      setAccountCodeFilter([...accountCodeFilter, code]);
    }
  };

  const isAllSelected =
    uniqueCodes.length > 0 && accountCodeFilter.length === uniqueCodes.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setAccountCodeFilter([]);
    } else {
      setAccountCodeFilter(uniqueCodes);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex justify-center w-52 rounded-md border border-black shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {accountCodeFilter.length === 0
          ? "Pilih Kode Akun"
          : accountCodeFilter.join(", ")}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="origin-top-left absolute mt-1 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-10 p-2">
          <label className="flex items-center space-x-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAll}
            />
            <span className="font-semibold">Pilih Semua</span>
          </label>

          {uniqueCodes.map((code) => (
            <label
              key={code}
              className="flex items-center space-x-2 mb-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={accountCodeFilter.includes(code)}
                onChange={() => toggleCode(code)}
              />
              <span>{code}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountCodeDropdown;
