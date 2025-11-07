'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { Switch } from '../../ui/switch';
import { Button } from '../../ui/button';
import {
  useUpdateProjectStep4,
  type ProjectStep4Data,
} from '@/services/hooks/useProject';
import { toast } from 'sonner';
import { useProjectStore } from '@/store/useProjectstore';

// ✅ SIMPLE INTERFACE - No Yup schema to avoid type conflicts
interface ConnectionToolFormData {
  channelType: 'new-channel' | 'existing';
  app: string;
  integrationMethod: string;
  accessToken?: string;
  webhookUrl?: string;
  channelId?: string;
  postPmtUpdates: boolean;
  postTaskUpdates: boolean;
  postDeadlineReminders: boolean;
  codeEvents: boolean;
  sentimentMonitoring: boolean;
  customCommands: boolean;
}

interface ConnectionToolProps {
  hideButton?: boolean;
  onSubmit: () => void;
  projectId?: number;
  defaultValues?: Partial<ConnectionToolFormData>;
}

const ConnectionTool = ({
  onSubmit,
  hideButton,
  projectId,
  defaultValues,
}: ConnectionToolProps) => {
  const updateProjectStep4 = useUpdateProjectStep4(projectId || 0);
  const setStep4Data = useProjectStore(state => state.setStep4Data);

  const { handleSubmit, setValue, watch, register } =
    useForm<ConnectionToolFormData>({
      defaultValues: {
        channelType: 'new-channel',
        app: 'slack',
        integrationMethod: 'api-key',
        accessToken: '',
        webhookUrl: '',
        channelId: '',
        postPmtUpdates: true,
        postTaskUpdates: false,
        postDeadlineReminders: false,
        codeEvents: true,
        sentimentMonitoring: false,
        customCommands: false,
        ...defaultValues,
      },
    });

  const watchedValues = watch();

  // Set default values when they are provided (for review mode)
  useEffect(() => {
    if (defaultValues) {
      console.log('🔄 Setting Connection Tool default values:', defaultValues);

      // Set all form values from defaultValues
      Object.entries(defaultValues).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof ConnectionToolFormData, value as any);
        }
      });
    }
  }, [defaultValues, setValue]);

  // ✅ MANUAL VALIDATION
  const validateForm = (data: ConnectionToolFormData): boolean => {
    if (!data.app) {
      toast.error('App is required');
      return false;
    }
    if (!data.integrationMethod) {
      toast.error('Integration method is required');
      return false;
    }
    if (data.integrationMethod === 'api-key' && !data.accessToken) {
      toast.error('Access token is required for API key method');
      return false;
    }
    if (data.integrationMethod === 'webhook' && !data.webhookUrl) {
      toast.error('Webhook URL is required for webhook method');
      return false;
    }
    if (data.channelType === 'existing' && !data.channelId) {
      toast.error('Channel ID is required for existing channel');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (data: ConnectionToolFormData) => {
    console.log('STEP 4 FORM DATA:', data);

    // Skip validation in review mode
    if (!defaultValues && !validateForm(data)) {
      return;
    }

    // Transform form data to match API schema
    const getIntegrationMethod = (
      method: string
    ): 'oauth2' | 'api_key' | 'webhook' => {
      if (method === 'oauth') return 'oauth2';
      if (method === 'api-key') return 'api_key';
      if (method === 'webhook') return 'webhook';
      return 'api_key';
    };

    const apiData: ProjectStep4Data = {
      comm_tool: data.app,
      comm_integration_method: getIntegrationMethod(data.integrationMethod),
      comm_channel_id:
        data.channelType === 'existing' ? data.channelId : undefined,
      comm_api_key:
        data.integrationMethod === 'api-key' ? data.accessToken : undefined,
      comm_webhook_url:
        data.integrationMethod === 'webhook' ? data.webhookUrl : undefined,
      comm_notifications: {
        pmt_updates: data.postPmtUpdates,
        code_events: data.codeEvents,
        sentiment_monitoring: data.sentimentMonitoring,
        custom_commands: data.customCommands,
      },
    };

    console.log('STEP 4 API PAYLOAD:', apiData);

    setStep4Data(apiData);

    if (!projectId) {
      console.log('No projectId available, skipping API call');
      toast.success('Communication tool setup saved locally');
      onSubmit();
      return;
    }

    // Skip API call in review mode
    if (defaultValues) {
      onSubmit();
      return;
    }

    updateProjectStep4.mutate(apiData, {
      onSuccess: responseData => {
        console.log('Step 4 completed successfully:', responseData);
        toast.success('Communication tool configured!');
        onSubmit();
      },
      onError: (error: any) => {
        console.error('Step 4 failed:', error);
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to configure communication tool';
        toast.error(errorMessage);
      },
    });
  };

  // Check if we're in review mode
  const isReviewMode = !!defaultValues;

  return (
    <div className="mt-2">
      <p className="text-normal max-w-[440px] text-base">
        Set up the tool for this project to help synchronize your activities
        with your preferred tool.
      </p>

      {/* ✅ FIXED: Remove yupResolver, use simple handleSubmit */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
        {/* Channel Type Radio Group */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Channel Type</Label>
          <RadioGroup
            value={watchedValues.channelType}
            onValueChange={(value: 'new-channel' | 'existing') =>
              setValue('channelType', value)
            }
            className="space-y-3"
            disabled={isReviewMode}
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
        </div>

        {/* Existing Channel ID */}
        {watchedValues.channelType === 'existing' && (
          <div className="mt-4 flex flex-col gap-2">
            <Label className="text-base font-semibold">Channel ID</Label>
            <Input
              placeholder="Enter channel ID"
              value={watchedValues.channelId}
              onChange={e => setValue('channelId', e.target.value)}
              className="w-full"
              disabled={isReviewMode}
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-base font-semibold">App</Label>
            <Select
              value={watchedValues.app}
              onValueChange={(value: string) => setValue('app', value)}
              disabled={isReviewMode}
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
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-base font-semibold">
              Integration Method
            </Label>
            <Select
              value={watchedValues.integrationMethod}
              onValueChange={(value: string) =>
                setValue('integrationMethod', value)
              }
              disabled={isReviewMode}
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
          </div>
        </div>

        {/* API Key Instructions */}
        {!isReviewMode && watchedValues.integrationMethod === 'api-key' && (
          <div className="text-normal mt-6 space-y-2 text-sm text-[#434343]">
            <p>
              1. Go to the{' '}
              <Link
                href="https://slack.com/"
                className="font-semibold text-[#086ACE] hover:underline"
              >
                Slack website
              </Link>{' '}
              and create a free account (you will need to confirm your email).
            </p>
            <p>
              2. After that go to your settings, under profile click API key.
            </p>
            <p>3. Generate API and paste below.</p>
          </div>
        )}

        {/* Webhook Instructions */}
        {!isReviewMode && watchedValues.integrationMethod === 'webhook' && (
          <div className="text-normal mt-6 space-y-2 text-sm text-[#434343]">
            <p>1. Go to your {watchedValues.app} workspace settings</p>
            <p>2. Navigate to Incoming Webhooks and create a new webhook</p>
            <p>3. Paste the webhook URL below.</p>
          </div>
        )}

        {/* Access Token Field */}
        {watchedValues.integrationMethod === 'api-key' && (
          <div className="mt-6 flex flex-col gap-2">
            <Label className="text-base font-semibold">Access Token</Label>
            <Input
              placeholder="Enter access token"
              value={watchedValues.accessToken}
              onChange={e => setValue('accessToken', e.target.value)}
              className="w-full"
              disabled={isReviewMode}
            />
          </div>
        )}

        {/* Webhook URL Field */}
        {watchedValues.integrationMethod === 'webhook' && (
          <div className="mt-6 flex flex-col gap-2">
            <Label className="text-base font-semibold">Webhook URL</Label>
            <Input
              placeholder="https://hooks.slack.com/services/..."
              value={watchedValues.webhookUrl}
              onChange={e => setValue('webhookUrl', e.target.value)}
              className="w-full"
              disabled={isReviewMode}
            />
          </div>
        )}

        {/* Success message in review mode */}
        {isReviewMode && (
          <div className="mt-6">
            <span className="text-iq-suc-300 flex items-center gap-1 text-[14px]">
              <span className="icon-[material-symbols-light--check-circle-outline-rounded] size-4"></span>
              Successfully connected
            </span>
          </div>
        )}

        {/* Notifications Section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Post PMT updates</Label>
              <p className="text-sm font-normal text-[#434343]">
                Get notifications of PMT task or updates on {watchedValues.app}
              </p>
            </div>
            <Switch
              checked={watchedValues.postPmtUpdates}
              onCheckedChange={(checked: boolean) =>
                setValue('postPmtUpdates', checked)
              }
              className="data-[state=checked]:bg-[#086ACE]"
              disabled={isReviewMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Post task updates</Label>
              <p className="text-sm font-normal text-[#434343]">
                Get notifications of task updates on {watchedValues.app}
              </p>
            </div>
            <Switch
              checked={watchedValues.postTaskUpdates}
              onCheckedChange={(checked: boolean) =>
                setValue('postTaskUpdates', checked)
              }
              className="data-[state=checked]:bg-[#086ACE]"
              disabled={isReviewMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">
                Post deadline reminders
              </Label>
              <p className="text-sm font-normal text-[#434343]">
                Get deadline reminder notifications on {watchedValues.app}
              </p>
            </div>
            <Switch
              checked={watchedValues.postDeadlineReminders}
              onCheckedChange={(checked: boolean) =>
                setValue('postDeadlineReminders', checked)
              }
              className="data-[state=checked]:bg-[#086ACE]"
              disabled={isReviewMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Code events</Label>
              <p className="text-sm font-normal text-[#434343]">
                Get notifications for code commits, PRs, and deployments
              </p>
            </div>
            <Switch
              checked={watchedValues.codeEvents}
              onCheckedChange={(checked: boolean) =>
                setValue('codeEvents', checked)
              }
              className="data-[state=checked]:bg-[#086ACE]"
              disabled={isReviewMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">
                Sentiment monitoring
              </Label>
              <p className="text-sm font-normal text-[#434343]">
                Monitor team sentiment and get alerts
              </p>
            </div>
            <Switch
              checked={watchedValues.sentimentMonitoring}
              onCheckedChange={(checked: boolean) =>
                setValue('sentimentMonitoring', checked)
              }
              className="data-[state=checked]:bg-[#086ACE]"
              disabled={isReviewMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base font-normal">Custom commands</Label>
              <p className="text-sm font-normal text-[#434343]">
                Enable custom slash commands
              </p>
            </div>
            <Switch
              checked={watchedValues.customCommands}
              onCheckedChange={(checked: boolean) =>
                setValue('customCommands', checked)
              }
              className="data-[state=checked]:bg-[#086ACE]"
              disabled={isReviewMode}
            />
          </div>
        </div>

        {/* Submit Button - Only show when not in review mode */}
        {!hideButton && !isReviewMode && (
          <Button
            className="mt-8 w-full cursor-pointer bg-[#086ACE] p-6 text-base font-semibold hover:bg-[#086ACE]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            type="submit"
            disabled={updateProjectStep4.isPending}
          >
            {updateProjectStep4.isPending ? 'Saving...' : 'Next'}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ConnectionTool;
