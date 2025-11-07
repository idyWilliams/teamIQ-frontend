import Image from 'next/image';
import { Clock } from 'lucide-react';

interface OrganizationMemberCardProps {
  name: string;
  tasks: string;
  lastSeen: string;
  avatar?: string;
  onClick?: () => void;
}

export default function OrganizationMemberCard({
  name,
  tasks,
  lastSeen,
  avatar,
  onClick,
}: OrganizationMemberCardProps) {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
    >
      {/* Avatar or initials */}
      {avatar ? (
        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt={`${name} profile picture`}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-blue-100">
          <span className="text-sm font-medium text-blue-600">
            {getInitials(name)}
          </span>
        </div>
      )}

      <div className="w-full text-center">
        <h3 className="truncate text-sm font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-xs text-gray-500 capitalize">{tasks}</p>
        <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-500">
          <Clock size={12} className="text-gray-400" />
          <span>Last seen {lastSeen}</span>
        </div>
      </div>
    </div>
  );
}
