import Image from 'next/image';
import { Clock, Mail, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { UserOut } from '@/types/projects';
import { getFallbackInitials } from '@/lib/utils';

interface OrganizationMemberCardProps {
  member: UserOut;
  onClick?: () => void;
}

export default function OrganizationMemberCard({
  member,
  onClick,
}: OrganizationMemberCardProps) {
  const isModerator = member.job_title?.toLowerCase() === 'admin' || member.job_title?.toLowerCase() === 'owner';

  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer border-gray-100 shadow-sm transition-all duration-300 hover:border-[#086ACE] hover:shadow-md hover:-translate-y-1 rounded-2xl overflow-hidden"
    >
      <CardContent className="p-5 flex flex-col items-center">
        <div className="relative mb-4">
          {member.avatar_url ? (
            <div className="size-20 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-[#086ACE]/10 transition-all">
              <Image
                src={member.avatar_url}
                alt={member.display_name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-inner group-hover:from-blue-100 group-hover:to-indigo-100 transition-all text-blue-600 font-bold text-lg">
              {getFallbackInitials(member.display_name)}
            </div>
          )}
          
          <div className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-white shadow-sm ${member.online_status === 'online' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          
          {isModerator && (
            <div className="absolute -top-1 -right-1 bg-[#086ACE] text-white p-1 rounded-full border-2 border-white shadow-sm">
              <ShieldCheck size={12} />
            </div>
          )}
        </div>

        <div className="w-full text-center space-y-1">
          <h3 className="truncate text-base font-bold text-gray-900 group-hover:text-[#086ACE] transition-colors">{member.display_name}</h3>
          
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isModerator ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-50 text-gray-600 border border-gray-100'}`}>
              {member.job_title}
            </span>
          </div>
        </div>

        <div className="mt-4 flex w-full items-center justify-center gap-2 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#086ACE]">
            View Profile
            <UserIcon size={12} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
