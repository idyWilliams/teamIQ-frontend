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
  className = '',
}: TeamMemberCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-md ${className}`}
    >
      <Image
        src={avatar}
        alt={`${name} profile picture`}
        width={64}
        height={64}
        className="mb-3 h-16 w-16 rounded-full object-cover"
      />
      <div className="w-full text-center">
        <h3 className="mb-1 truncate text-sm font-semibold text-gray-900">
          {name}
        </h3>
        <div className="mx-auto flex w-fit items-center justify-center gap-1.5 rounded-full bg-blue-500/5 px-3 py-1">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
          <span className="truncate text-xs text-blue-600">{role}</span>
        </div>
      </div>
    </div>
  );
}
