import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  date: string;
};

const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
    date: '2025-11-20T16:10:49.913Z',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
    date: '2025-11-20T16:10:49.913Z',
  },
  {
    id: '4822e1d42',
    amount: 1215,
    status: 'success',
    email: 'examplswdffe@gmail.com',
    date: '2025-11-20T16:10:49.913Z',
  },
];

export default function Table() {
  return (
    <div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
