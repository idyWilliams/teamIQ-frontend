'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Select, SelectTrigger, SelectValue } from '../../ui/select';
import { SelectContent, SelectItem } from '@radix-ui/react-select';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { Switch } from '../../ui/switch';
import { Button } from '../../ui/button';


interface ConnectionToolProps {
  onSubmit?: () => void;
}

const ConnectionTool = ({ onSubmit }: ConnectionToolProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = () => {
    onSubmit?.();
  };

  return (
    <div className="mt-2 ">
      <p className="text-normal text-base max-w-[440px]">
        Set up the tool for this project to help synchronize your activities with 
        your preferred tool.
      </p>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
        <RadioGroup defaultValue="new-channel">
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="new-channel"
              id="r1"
              className="text-[#086ACE]"
            />
            <Label htmlFor="r1" className="text-base font-normal">
              New Channel
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="existing"
              id="r2"
              className="text-[#086ACE]"
            />
            <Label htmlFor="r2" className="text-base font-normal">
              Existing Channel
            </Label>
          </div>
        </RadioGroup>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-base font-normal">App</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Slack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slack">Slack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid flex-col gap-2">
            <Label className="text-base font-normal">
              Integration Method
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="API Key" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="method">Method</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="text-normal mt-5 text-sm text-[#434343]">
          <p>
            1. Go to the{' '}
            <Link href="https://slack.com/" className="font-semibold">
              Slack website
            </Link>{' '}
            and create a free account (you will need to confirm your email).
          </p>
          <p>
            2. After that go to your settings, under profile click API key.
          </p>
          <p>3. Generate API and paste below.</p>
        </div>
        
        <div className="mt-4 gap-2">
          <Label className="text-normal text-base">Access Token</Label>
          <Input placeholder="2873DEDPJXKWK" />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <p>Post PMT updates</p>
            <p className="text-sm font-normal text-[#434343]">
              Get notifications of PMT task or updates on Slack
            </p>
          </div>
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-[#086ACE]"
          />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-base font-normal text-[#0B0B0B]">
              Post PMT updates
            </p>
            <p className="text-sm font-normal text-[#434343]">
              Get notifications of PMT task or updates on Slack
            </p>
          </div>
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-[#086ACE]"
          />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-base font-normal text-[#0B0B0B]">
              Post PMT updates
            </p>
            <p className="text-sm font-normal text-[#434343]">
              Get notifications of PMT task or updates on Slack
            </p>
          </div>
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-[#086ACE]"
          />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-base font-normal text-[#0B0B0B]">
              Post PMT updates
            </p>
            <p className="text-sm font-normal text-[#434343]">
              Get notifications of PMT task or updates on Slack
            </p>
          </div>
          <Switch
            defaultChecked
            className="data-[state=checked]:bg-[#086ACE]"
          />
        </div>
        
        <Button 
          className="mt-4 w-full bg-[#086ACE] p-6 text-base font-semibold cursor-pointer" 
          type="submit"
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default ConnectionTool;