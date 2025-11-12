import React from 'react';
import { calculateStrength } from '@/utils/passwordStrength';

export default function PasswordStrengthIndicator({
  password,
  minLength = 8,
  isVisible = true,
}) {
  const { criteria, status } = calculateStrength(password, minLength);

  const getInputColor = status => {
    if (status === 'Weak') return 'text-red-600';
    if (status === 'Moderate') return 'text-yellow-600';
    return 'text-green-600';
  };

  if (!password || !isVisible) return null;

  return (
    <div
      className={`border-grey-300 mt-2 w-[200px] rounded-lg border bg-white p-3 shadow-sm`}
    >
      <p className={`mb-2 text-sm font-semibold ${getInputColor(status)}`}>
        Strength: {status}
      </p>
      <ul className="space-y-1 text-xs">
        <ChecklistItem
          isValid={criteria.minLength}
          label={`At least ${minLength} characters`}
        />
        <ChecklistItem
          isValid={criteria.capital}
          label={`At least 1 uppercase`}
        />
        <ChecklistItem
          isValid={criteria.lowercase}
          label={'At least 1 lowercase '}
        />
        <ChecklistItem isValid={criteria.number} label={`At least 1 number`} />
        <ChecklistItem
          isValid={criteria.specialChar}
          label={`At least 1 symbol`}
        />
      </ul>
    </div>
  );
}

const ChecklistItem = ({ isValid, label }) => {
  return (
    <li
      className={`flex items-center gap-2 ${isValid ? 'text-green-600' : 'text-red-600'}`}
    >
      <span>{isValid ? '✔️' : '❌'}</span>
      <span>{label}</span>
    </li>
  );
};
