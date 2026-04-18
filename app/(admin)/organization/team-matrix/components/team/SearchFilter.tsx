'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  trackFilter: string;
  setTrackFilter: (value: string) => void;
  tracks: string[];
}

export default function SearchFilter({
  search,
  setSearch,
  trackFilter,
  setTrackFilter,
  tracks,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-[320px] lg:w-[400px]">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for anything"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10"
        />
      </div>

      <Select value={trackFilter} onValueChange={setTrackFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Tracks" />
        </SelectTrigger>
        <SelectContent>
          {tracks.map((track) => (
            <SelectItem key={track} value={track}>
              {track}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}