import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { data } from '../../../utils/data';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const InviteTable = () => {
  return (
    <div className="mx-auto w-[70%]">
      <Table className="h-[60%] w-full">
        <TableHeader className="boder-b h-[40px] w-[700px] gap-4 p-2">
          <TableRow className="w-full">
            <TableHead className="h-[20px] border-l p-2">Name</TableHead>
            <TableHead className="h-[20px] border-l p-2">Stack</TableHead>
            <TableHead className="h-[20px] border-l p-2">
              Employment Type
            </TableHead>
            <TableHead className="h-[20px] border-l p-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.id}
              className={`${idx % 2 === 1 ? 'bg-[#f8f9fb]' : 'bg-[#ffffff]'} `}
            >
              <TableCell className="flex h-[40px] items-center gap-2 border-[#1c1c1c0d]">
                <Image
                  src={'/images/avatar.jpg'}
                  alt="profile-picture"
                  width={24}
                  height={40}
                  className="rounded-full"
                />
                {row.name}
              </TableCell>
              <TableCell className="h-[40px] border-[#1c1c1c0d]">
                {row.employmentType}
              </TableCell>
              <TableCell className="h-[40px] border-[#1c1c1c0d]">
                {row.stack}
              </TableCell>
              <TableCell className="flex h-[40px] items-center justify-end gap-2 border-[#1c1c1c0d]">
                {row.status}
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex cursor-pointer items-center justify-center gap-2 outline-0 hover:text-[#1c1c1c0d]"
                >
                  <Trash2 className="h-4 w-4 text-[#ebeef2]" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InviteTable;
