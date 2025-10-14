import React from 'react';
import { Button } from '@/components/ui/button';
import { data } from '../../data/data';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InviteTable = () => {

  return (
    <div className='w-[65%] mx-auto'>
        <Table className='w-full h-[60%]'>
        <TableHeader className="w-[700px] h-[40px] boder-b p-2 gap-4">
          <TableRow className='w-full'>
            <TableHead className='h-[20px] border-l p-2'>Name</TableHead>
            <TableHead className=' h-[20px] border-l p-2'>Stack</TableHead>
            <TableHead className=' h-[20px] border-l p-2'>Employment Type</TableHead>
            <TableHead  className=' h-[20px] border-l p-2'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={row.id}
              className={`${idx % 2 === 1 ? "bg-[#f8f9fb]" : "bg-[#ffffff]"} `}
            >
              <TableCell className='h-[40px] border-[#1c1c1c0d]'>{row.name}</TableCell>
              <TableCell className='h-[40px] border-[#1c1c1c0d]'>{row.employmentType}</TableCell>
              <TableCell className='h-[40px] border-[#1c1c1c0d]'>{row.stack}</TableCell>
              <TableCell className='flex items-center justify-end gap-2 h-[40px] border-[#1c1c1c0d]'>
                {row.status}
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center justify-center gap-2 hover:text-[#1c1c1c0d] outline-0 cursor-pointer"
                >
                  
                  <Trash2  className="text-[#ebeef2] h-4 w-4 " />
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </div>
  )
}

export default InviteTable;