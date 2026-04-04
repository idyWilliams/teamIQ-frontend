import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TeamMemberPreview {
  id: number;
  name: string;
  track: string;
  skills: Record<string, number>;
  image: string;
  github?: string;
  isVerified?: boolean;
}

const skillColors: Record<string, string> = {
  Python: 'text-purple-500',
  TypeScript: 'text-yellow-500',
  React: 'text-pink-500',
};

const valueColors: Record<string, string> = {
  Python: 'text-red-500',
  TypeScript: 'text-green-500',
  React: 'text-green-500',
};

interface Props {
  member: TeamMemberPreview;
  onView: (member: TeamMemberPreview) => void;
}

export default function TeamMemberCard({ member, onView }: Props) {
  return (
    <Card className="border-0 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
  
      <CardContent className="p-2 flex flex-col items-center text-center gap-2">

        {/* Avatar + Verified */}
        <div className="relative">
          <Image
            src={member.image || '/default-avatar.png'}
            alt={member.name}
            width={52}
            height={52}
            className="rounded-full object-cover"
          />

          {member.isVerified && (
            <span className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 text-white text-[8px]">
              ✓
            </span>
          )}
        </div>

        {/* Name */}
        <div>
          <h4 className="text-xs font-semibold leading-tight">{member.name}</h4>
          <p className="text-[10px] text-gray-400 leading-tight">{member.track}</p>
        </div>

        {/* Skills */}
        <div className="w-full space-y-[1px]">
          {Object.entries(member.skills).map(([name, value]) => (
            <p key={name} className="flex justify-between text-[11px] font-medium">
              <span className={skillColors[name]}>{name}</span>
              <span className={valueColors[name]}>{value}%</span>
            </p>
          ))}
        </div>

        {/* GitHub */}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline"
          >
            View in Github
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}

        {/* Button (now tight to content) */}
        <Button
          size="sm"
          className="w-full text-xs bg-iq-500 hover:bg-iq-300 mt-1 cursor-pointer"
          onClick={() => onView(member)}
        >
          View Profile
        </Button>

      </CardContent>
    </Card>
  );
}