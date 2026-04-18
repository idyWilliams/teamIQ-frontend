import React, { useState } from 'react';
import { useResendInvite } from '@/services/hooks/useInviteUser';
import { useRevokeInvite } from '@/services/hooks/useInviteUser';
// import { pendingData } from '../../../utils/data';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface PendingUsersProps {
  pendingUsers?: Array<{
    id: number;
    email: string;
    role: string;
    status: string;
    track: string;
    accepted: boolean;
    createdAt: string;
  }>;
}

const PendingTable = ({ pendingUsers = [] }: PendingUsersProps) => {
  const { mutate: resendInvite, isPending: isSending } = useResendInvite();
  const { mutate: revokeInvite, isPending: isRevoking } = useRevokeInvite();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleResend = (invitation_Id: number) => {
    resendInvite(invitation_Id);
  };

  const handleRevoke = (invitation_Id: number) => {
    revokeInvite(invitation_Id);
  };

  return (
    <div className="w-[70%] overflow-x-auto">
      <Table className="">
        <TableHeader className="w-full] boder-b h-[40px] gap-4 p-2">
          <TableRow className="w-full">
            <TableHead className="border-l p-2">Email</TableHead>
            <TableHead className="border-l p-2">Track</TableHead>
            <TableHead className="border-l p-2">Date</TableHead>
            <TableHead className="border-l p-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingUsers?.map(row => (
            <TableRow key={row.id}>
              <TableCell className="border-b border-[#1c1c1c0d]">
                {row.email}
              </TableCell>
              <TableCell className="border-b border-[#1c1c1c0d]">
                {row.track}
              </TableCell>
              <TableCell className="border-b border-[#1c1c1c0d]">
                {formatDate(row.createdAt)}
              </TableCell>
              <TableCell className="border-b border-[#1c1c1c0d]">
                <div className="flex items-center justify-center gap-2">
                  <div>{row.status}</div>
                  <Button
                    size="sm"
                    className="w-[120px] cursor-pointer bg-[#086ace] whitespace-nowrap text-[#ffffff] hover:bg-transparent hover:text-[#086ace]"
                    onClick={() => handleResend(row.id)}
                  >
                    {isSending ? 'Resending Invite' : 'Resend Invite'}
                  </Button>
                  <Button
                    size="sm"
                    className="w-[120px] cursor-pointer border border-[#086ace] bg-[#ffffff] whitespace-nowrap text-[#086ace] hover:bg-[#086ace] hover:text-[#ffffff]"
                    onClick={() => handleRevoke(row.id)}
                  >
                    {isRevoking ? 'Revoking Invite' : 'Revoke Invite'}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingTable;
