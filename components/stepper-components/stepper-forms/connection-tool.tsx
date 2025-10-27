'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { Switch } from '../../ui/switch';
import { Button } from '../../ui/button';

const connectionToolSchema = yup.object({
  channelType: yup.string().oneOf(['new-channel', 'existing']).required('Channel type is required'),
  app: yup.string().required('App is required'),
  integrationMethod: yup.string().required('Integration method is required'),
  accessToken: yup.string().required('Access token is required'),
  postPmtUpdates: yup.boolean().default(true),
  postTaskUpdates: yup.boolean().default(false), 
  postDeadlineReminders: yup.boolean().default(false),
});

export type ConnectionToolFormData = yup.InferType<typeof connectionToolSchema>;

interface ConnectionToolProps {
  hideButton?: boolean;
  onSubmit: (data: ConnectionToolFormData) => void;
  defaultValues?: Partial<ConnectionToolFormData>;
}

const ConnectionTool = ({ onSubmit, hideButton, defaultValues }: ConnectionToolProps) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<ConnectionToolFormData>({
    resolver: yupResolver(connectionToolSchema),
    defaultValues: {
      channelType: 'new-channel',
      app: 'slack',
      integrationMethod: 'api-key',
      accessToken: '2873DEDPJXKWK',
      postPmtUpdates: true,
      postTaskUpdates: false,
      postDeadlineReminders: false,
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: ConnectionToolFormData) => {
    console.log('Form submitted:', data);
    onSubmit(data);
  };

  // Watch values for controlled components
  const watchedValues = watch();

  return (
    <div className="mt-2">
      <p className="text-normal text-base max-w-[440px]">
        Set up the tool for this project to help synchronize your activities with 
        your preferred tool.
      </p>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
        {/* Channel Type Radio Group - FIXED */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Channel Type</Label>
          <RadioGroup
            value={watchedValues.channelType}
            onValueChange={(value: "new-channel" | "existing") => setValue('channelType', value)}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="new-channel"
                id="new-channel"
                className="text-[#086ACE]"
              />
              <Label htmlFor="new-channel" className="text-base font-normal">
                New Channel
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="existing"
                id="existing"
                className="text-[#086ACE]"
              />
              <Label htmlFor="existing" className="text-base font-normal">
                Existing Channel
              </Label>
            </div>
          </RadioGroup>
          {errors.channelType && (
            <p className="text-sm text-red-500">{errors.channelType.message}</p>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-base font-semibold">App</Label>
            <Select
              value={watchedValues.app}
              onValueChange={(value: string) => setValue('app', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select app" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slack">Slack</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="discord">Discord</SelectItem>
              </SelectContent>
            </Select>
            {errors.app && (
              <p className="text-sm text-red-500">{errors.app.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-base font-semibold">Integration Method</Label>
            <Select
              value={watchedValues.integrationMethod}
              onValueChange={(value: string) => setValue('integrationMethod', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api-key">API Key</SelectItem>
                <SelectItem value="oauth">OAuth</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
              </SelectContent>
            </Select>
            {errors.integrationMethod && (
              <p className="text-sm text-red-500">{errors.integrationMethod.message}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-normal text-sm text-[#434343] space-y-2">
          <p>
            1. Go to the{' '}
            <Link href="https://slack.com/" className="font-semibold text-[#086ACE] hover:underline">
              Slack website
            </Link>{' '}
            and create a free account (you will need to confirm your email).
          </p>
          <p>
            2. After that go to your settings, under profile click API key.
          </p>
          <p>3. Generate API and paste below.</p>
        </div>
        
        <div className="mt-6 flex flex-col gap-2">
          <Label className="text-base font-semibold">Access Token</Label>
          <Input 
            placeholder="2873DEDPJXKWK" 
            value={watchedValues.accessToken}
            onChange={(e) => setValue('accessToken', e.target.value)}
            className="w-full"
          />
          {errors.accessToken && (
            <p className="text-sm text-red-500">{errors.accessToken.message}</p>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Post PMT updates</Label>
              <p className="text-sm font-normal text-[#434343]">
                Get notifications of PMT task or updates on Slack
              </p>
            </div>
            <Switch
              checked={watchedValues.postPmtUpdates}
              onCheckedChange={(checked: boolean) => setValue('postPmtUpdates', checked)}
              className="data-[state=checked]:bg-[#086ACE]"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Post task updates</Label>
              <p className="text-sm font-normal text-[#434343]">
                Get notifications of task updates on Slack
              </p>
            </div>
            <Switch
              checked={watchedValues.postTaskUpdates}
              onCheckedChange={(checked: boolean) => setValue('postTaskUpdates', checked)}
              className="data-[state=checked]:bg-[#086ACE]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Post deadline reminders</Label>
              <p className="text-sm font-normal text-[#434343]">
                Get deadline reminder notifications on Slack
              </p>
            </div>
            <Switch
              checked={watchedValues.postDeadlineReminders}
              onCheckedChange={(checked: boolean) => setValue('postDeadlineReminders', checked)}
              className="data-[state=checked]:bg-[#086ACE]"
            />
          </div>
        </div>

        {!hideButton && (
          <Button 
            className="mt-8 w-full bg-[#086ACE] p-6 text-base font-semibold cursor-pointer hover:bg-[#086ACE]/90" 
            type="submit"
          >
            Next
          </Button>
        )}
      </form>
    </div>
  );
};

export default ConnectionTool;