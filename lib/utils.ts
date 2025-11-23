import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// status color for the department column of the Team Members Table
export const getTasksBadgeColor = (tasks?: string) => {
  switch (tasks?.toLowerCase()) {
    case 'product design':
      return 'bg-blue-50 text-blue-600';
    case 'frontend dev':
      return 'bg-purple-50 text-purple-600';
    case 'full-stack dev':
      return 'bg-pink-50 text-pink-600';
    case 'backend dev':
      return 'bg-orange-50 text-orange-600';
    default:
      return 'bg-gray-50 text-gray-600';
  }
};

// status color for the status column of the Team Members Table
export const getStatusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'busy':
      return 'text-red-500';
    case 'available':
      return 'text-blue-500';
    case 'offline':
      return 'text-gray-400';
    default:
      return 'text-gray-500';
  }
};
