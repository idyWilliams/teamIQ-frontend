import React from 'react';
import RightArrow from './icons/RightArrow';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectValue } from './ui/select';
import { SelectContent, SelectItem } from '@radix-ui/react-select';
import Link from 'next/link';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

const StepFour = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <RightArrow size="20" />
        <p className="text-xl font-semibold">Communication Tool Setup</p>
      </div>
      <div className="mt-2 max-w-[440px]">
        <p className="text-normal text-base">
          Set up the tool for this project to help synchronize your activities
          with your preferred tool.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <RadioGroup defaultValue="new-channel">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="new-channel" id="r1" />
            <Label htmlFor="r1" className="text-base font-normal">
              New Channel
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="existing" id="r2" />
            <Label htmlFor="r2" className="text-base font-normal">
              Existing Channel
            </Label>
          </div>
        </RadioGroup>
        <div className="mt-4 grid grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-base font-normal">App</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Slack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slack">Slack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid flex-col gap-2">
            <Label className="text-base font-normal">Integratioin Method</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="API Key" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="method">Method</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-normal text-sm text-[#434343]">
          <p>
            1. Go to the{' '}
            <Link href="https://slack.com/" className="font-semibold">
              Slack website
            </Link>{' '}
            and create a free account(you will need to confirm your email).
          </p>
          <p>2. After that go to your setting, under profile click API key.</p>
          <p>3. Generate API and paste below.</p>
        </div>
        <div className='gap-2 mt-4'>
          <Label className="text-normal text-base">Access Token</Label>
          <Input placeholder='2873DEDPJXKWK'/>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex flex-col'>
          <p>Post PMT updates</p>
          <p>Get notifications of PMT task or updates on slacks</p>
          </div>
          <Switch defaultChecked/>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex flex-col'>
          <p>Post PMT updates</p>
          <p>Get notifications of PMT task or updates on slacks</p>
          </div>
          <Switch defaultChecked/>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex flex-col'>
          <p>Post PMT updates</p>
          <p>Get notifications of PMT task or updates on slacks</p>
          </div>
          <Switch defaultChecked/>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex flex-col'>
          <p>Post PMT updates</p>
          <p>Get notifications of PMT task or updates on slacks</p>
          </div>
          <Switch defaultChecked/>
        </div>
        <Button className='bg-[#086ACE] w-full mt-2'>
          Next
        </Button>
      </form>
    </div>
  );
};

export default StepFour;
