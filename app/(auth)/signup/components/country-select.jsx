'use client';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from './country-list';

const CountrySelect = ({ control, name, label, errors }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {label && <Label className="mb-2 font-normal">{label}</Label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedCountry = countryList.find(c => c.name === field.value);

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    '!placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md focus-visible:bg-[#F0F6FC] focus-visible:border-b-[#B3C4D6] focus-visible:ring-0',
                    'flex items-center justify-between w-full',
                    
                    // ✅ BACKGROUND LOGIC (THIS IS THE FIX)
                    !field.value ? 'bg-[#F7F7F7] text-[#B3C4D6]' : 'bg-white text-black'
                  )}
                >
                  {selectedCountry ? (
                    <span className="flex items-center gap-2 text-black">
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        className="h-4 w-5 object-cover"
                      />
                      {selectedCountry.name}
                    </span>
                  ) : (
                    'Select country'
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[280px] p-0 bg-[#F7F7F7] text-black border border-[#B3C4D6] shadow-sm z-50">
                <Command className="bg-[#F7F7F7] text-black">
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countryList.map(country => (
                        <CommandItem className="text-black hover:bg-[#F0F6FC]"
                          key={country.code}
                          value={country.name}
                          onSelect={() => {
                            field.onChange(country.name);
                            setOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={country.flag}
                              alt={country.name}
                              className="h-4 w-5 object-cover"
                            />
                            <span className="text-black">{country.name}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {errors?.[name]?.message && (
        <span className="mt-1 text-xs text-red-500">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default CountrySelect;
