import { User } from 'lucide-react';

interface LogoProps {
  label: string;
}

const NavLogo = ({ label }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="ml-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
        <User className="h-3 w-3 text-gray-600" />
      </div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default NavLogo;
