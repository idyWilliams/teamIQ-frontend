import React from 'react';
import { calculateStrength } from '@/utils/passwordStrength';
import PasswordStrengthIndicator from './password-strength-indicator';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';

interface PasswordInputStrengthProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const PasswordInputStrength: React.FC<PasswordInputStrengthProps> = ({
  value,
  onChange,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const minLength = 8;

  const { status } = calculateStrength(value, minLength);

  const bgColor = (status: string, password: string, isFocused: boolean) => {
    if (!password && !isFocused) return 'bg-[#F7F7F7] border-b-[#B3C4D6]';

    if (status === 'Weak') return 'bg-[#FFE7E3] border-b-[#E22200] border-b-2';
    if (status === 'Moderate')
      return 'bg-[#FAE3C7] border-b-[#EC9D3E] border-b-2';
    if (status === 'Strong')
      return 'bg-[#D2FAF3] border-b-[#17C1A6] border-b-2';

    return 'bg-[#F0F6FC] border-b-[#B3C4D6]';
  };

  const styleInput = `
    !placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base
    border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md
    focus-visible:ring-0
  `;

  return (
    <div className="flex-1">
      <Label htmlFor="password" className="mb-4 font-normal">
        Password
      </Label>
      <PasswordInput
        id="password"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (onBlur) {
            onBlur();
          }
          setIsFocused(false);
        }}
        placeholder="Enter password"
        className={`${styleInput} ${bgColor(status, value, isFocused)}`}
      />
      <PasswordStrengthIndicator
        password={value}
        minLength={minLength}
        isVisible={isFocused}
      />
    </div>
  );
};
