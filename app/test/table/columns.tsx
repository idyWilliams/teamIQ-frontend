'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  date: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      console.log(row, 'CELLsss');

      return <div>#{row.original.id}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          className={cn(
            'rounded-full border',
            status === 'processing' &&
              'border-amber-200 bg-amber-200/20 text-amber-400',
            status === 'pending' &&
              'border-gray-200 bg-gray-200/20 text-gray-400',
            status === 'success' &&
              'border-green-700 bg-green-700/20 text-green-400'
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'email',
    header: () => (
      <div>
        {' '}
        <span className="icon-[basil--envelope-solid] text-blue-400"></span>{' '}
        Email
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    id: "actions", 
    cell: () => {
      return <button>....</button>
    }
  }
];
