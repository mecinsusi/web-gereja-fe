"use client";

import { useState } from "react";
import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiMenu,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
} from "react-icons/hi";
import { PiChurchFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

export function NavbarSection() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Fungsi untuk menutup sidebar
  const closeSidebar = () => setSidebarOpen(false);

  //Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // hapus token
    router.push("/login"); // redirect ke halaman login
  };

  return (
    <div className="flex">
      {/* Overlay (Klik di luar Sidebar untuk menutup) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 bg-white shadow-lg
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:shadow-none`}
      >
        <Sidebar aria-label="Sidebar with logo branding example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/finance" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={PiChurchFill}
                label="Gereja"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

                  return (
                    <IconComponent
                      aria-hidden
                      className={twMerge(
                        theme.label.icon.open[open ? "on" : "off"],
                      )}
                    />
                  );
                }}
              >
                <Sidebar.Item href="/church">Transaksi Kas Harian</Sidebar.Item>
                <Sidebar.Item href="/church/income">Pemasukan</Sidebar.Item>
                <Sidebar.Item href="/church/spending">Pengeluaran</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Navbar + Content */}
      <div className="flex flex-col flex-1">
        <Navbar
          fluid
          theme={{ root: { base: "px-4 py-5 bg-gray-300 sm:px-4" } }}
        >
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            <HiMenu className="h-6 w-6" />
          </button>
          <Navbar.Brand
            href="/"
            className="mx-auto place-items-center"
          ></Navbar.Brand>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </Navbar>
      </div>
    </div>
  );
}
