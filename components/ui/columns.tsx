import { ColumnDef } from '@tanstack/react-table';
import { Star } from 'lucide-react';
import { TeamMember } from '@/constants/team-member';
import Image from 'next/image';
import { getTasksBadgeColor, getStatusColor } from '@/lib/utils';


// Organization Team Members columns
export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.profile_picture || '/images/default-avatar.png'}
          alt={row.getValue('name')}
          width={32}
          height={32}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {row.getValue('name')}
          </span>
          <span className="text-sm text-gray-500">{row.original.role}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'tasks',
    header: 'Department',
    cell: ({ row }) => (
      <span
        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${getTasksBadgeColor(
          row.getValue('tasks')
        )}`}
      >
        {row.getValue('tasks')}
      </span>
    ),
  },
  {
    accessorKey: 'skills',
    header: 'Skills',
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.skills?.join(', ') || 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 ${getStatusColor(
            row.getValue('status')
          )}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
          <span className="text-sm font-medium">{row.getValue('status')}</span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'rating',
    header: 'Performance',
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-black" />
          <span className="text-sm font-medium text-gray-900">
            {row.getValue('rating')}
          </span>
        </div>
        <span className="text-sm text-gray-500">{row.original.lastSeen}</span>
      </div>
    ),
  },
];
