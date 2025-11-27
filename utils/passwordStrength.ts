// ✅ Single source of truth for password strength logic

export interface StrengthCriteria {
  minLength: boolean;
  specialChar: boolean;
  number: boolean;
  capital: boolean;
  lowercase: boolean;
}

export type StrengthStatus = 'Weak' | 'Moderate' | 'Strong';

export const calculateStrength = (
  password: string,
  minLength = 8
): {
  score: number;
  criteria: StrengthCriteria;
  status: StrengthStatus;
} => {
  const criteria: StrengthCriteria = {
    minLength: password.length >= minLength,
    specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    number: /\d/.test(password),
    capital: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };

  const passed = Object.values(criteria).filter(Boolean).length;

  let status: StrengthStatus;
  if (passed <= 2) status = 'Weak';
  else if (passed <= 3) status = 'Moderate';
  else status = 'Strong';

  return { score: passed, criteria, status };
};
