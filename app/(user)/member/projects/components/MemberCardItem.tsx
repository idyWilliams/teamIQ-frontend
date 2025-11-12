import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  avatar: string;
  onClick?: () => void;
  className?: string;
}

export default function TeamMemberCard({ 
  name, 
  role, 
  avatar, 
  onClick,
  className = ""
}: TeamMemberCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-blue-500 hover:shadow-md transition-all ${className}`}
    >
      <Image
        src={avatar}
        alt={`${name} profile picture`}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full object-cover mb-3"
      />
      <div className="text-center w-full">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm truncate">
          {name}
        </h3>
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
          <span className="text-xs text-blue-600 truncate">{role}</span>
        </div>
      </div>
    </div>
  );
}