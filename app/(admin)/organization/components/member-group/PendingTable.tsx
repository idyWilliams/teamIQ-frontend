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
    <div className='w-[65%] overflow-x-auto'>
         <Table className=''>
        <TableHeader className="w-full] h-[40px] boder-b p-2 gap-4">
          <TableRow className='w-full'>
            <TableHead className='border-l p-2'>Name</TableHead>
            <TableHead className='border-l p-2'>Stack</TableHead>
            <TableHead className='border-l p-2'>Date</TableHead>
            <TableHead  className='border-l p-2'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingData.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell className='border-b border-[#1c1c1c0d]'>{row.name}</TableCell>
              <TableCell className='border-b border-[#1c1c1c0d]'>{row.stack}</TableCell>
              <TableCell className='border-b border-[#1c1c1c0d]'>{row.dateSent}</TableCell>
              <TableCell className='border-b border-[#1c1c1c0d]'>
                <div className='flex items-center justify-center gap-2'>
                <Button
                  size="sm"
                  className="text-[#ffffff] bg-[#086ace] 
                  w-[120px]  hover:bg-transparent hover:text-[#086ace]
                   whitespace-nowrap cursor-pointer"
                >               
                Resend Invite
                </Button>
                <Button
                  size="sm"
                  className="text-[#086ace] bg-[#ffffff]
                   w-[120px] border border-[#086ace] 
                    hover:bg-[#086ace] hover:text-[#ffffff] 
                    whitespace-nowrap cursor-pointer"
                >               
                Revoke Invite
                </Button>
                </div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </div>
  )
}

export default PendingTable