import React from 'react'
import { pendingData } from '../../data/data';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from '@/components/ui/button';

const PendingTable = () => {
  return (
    <div>
         <Table className='h-[60%]'>
        <TableHeader className="w-[700px] h-[40px] boder-b p-2 gap-4">
          <TableRow className='w-full'>
            <TableHead className='w-[120px] h-[20px] border-l p-2'>Name</TableHead>
            <TableHead className='w-[120px] h-[20px] border-l p-2'>Stack</TableHead>
            <TableHead className='w-[150px] h-[20px] border-l p-2'>Date</TableHead>
            <TableHead  className='w-[220px] h-[20px] border-l p-2'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingData.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell className='h-[40px] border-b border-[#1c1c1c0d]'>{row.name}</TableCell>
              <TableCell className='h-[40px] border-b border-[#1c1c1c0d]'>{row.stack}</TableCell>
              <TableCell className='h-[40px] border-b border-[#1c1c1c0d]'>{row.dateSent}</TableCell>
              <TableCell className='flex items-center justify-center gap-2 h-[40px] border-b border-[#1c1c1c0d]'>
                <Button
                  size="sm"
                  className="text-[#ffffff] bg-[#086ace] px-3 py-2 whitespace-nowrap cursor-pointer"
                >               
                Resend Invite
                </Button>
                <Button
                  size="sm"
                  className="text-[#086ace] bg-[#ffffff] border border-[#086ace] px-3 py-2 whitespace-nowrap cursor-pointer"
                >               
                Revoke Invite
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </div>
  )
}

export default PendingTable