import Image from "next/image";
import { Clock } from "lucide-react";

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
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
    >
      {/* Avatar or initials */}
      {avatar ? (
        <Image
          src={avatar}
          alt={`${name} profile picture`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover mb-3"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      )}

      <div className="text-center w-full">
        <h3 className="font-semibold text-gray-900 text-sm truncate">{name}</h3>
        <p className="text-xs text-gray-500">{tasks}</p>
        <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-500">
          <Clock size={12} className="text-gray-400" />
          <span>Last seen {lastSeen}</span>
        </div>
      </div>
    </div>
  );
}
