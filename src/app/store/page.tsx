"use client"

import React from 'react'
import { Table } from 'flowbite-react'

const StoreReport = () => {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Tanggal</Table.HeadCell>
          <Table.HeadCell>Kode Akun</Table.HeadCell>
          <Table.HeadCell>Keterangan</Table.HeadCell>
          <Table.HeadCell>Debet</Table.HeadCell>
          <Table.HeadCell>Kredit</Table.HeadCell>
          <Table.HeadCell>Kode Nota</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>01/12/2025</Table.Cell>
            <Table.Cell>1.1.1</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>10.000</Table.Cell>
            <Table.Cell>30.000</Table.Cell>
            <Table.Cell>21</Table.Cell>
            <Table.Cell className='space-x-4'>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default StoreReport
