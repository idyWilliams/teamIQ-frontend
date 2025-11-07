'use client';

import { Controller, useForm } from 'react-hook-form';
import StepHeader from '../steps/step-header';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ProjectStep3Data,
  useUpdateProjectStep3,
} from '@/services/hooks/useProject';
import { toast } from 'sonner';
import { useProjectStore } from '@/store/useProjectstore';

interface FormValues {
  projectType: string;
  app: string;
  integrationMethod: string;
  token?: string;
  assignMapping?: string;
  permissions: string;
}

interface VersionControlSetupProps {
  onSubmit?: () => void;
  hideButton?: boolean;
  projectId?: number;
  defaultValues?: {
    app: string;
    integrationMethod: string;
    assignMapping?: string;
    token?: string;
    permissions: string;
  };
}

const VersionControlSetup = ({
  onSubmit,
  hideButton,
  projectId,
  defaultValues,
}: VersionControlSetupProps) => {
  const [activeMethod, setActiveMethod] = useState('');
  const [projectType, setProjectType] = useState('new');
  const [connected, setConnected] = useState(false);

  const updateProjectStep3 = useUpdateProjectStep3(projectId || 0);
  const setStep3Data = useProjectStore(state => state.setStep3Data);

  // Validation Schema
  const schema: yup.ObjectSchema<FormValues> = yup.object({
    projectType: yup.string().required('project type is required!'),
    app: yup.string().required('app is required!'),
    integrationMethod: yup.string().required('integration method is required!'),
    token: yup.string().when('integrationMethod', {
      is: 'Api',
      then: schema => schema.required('access token is required!'),
      otherwise: schema => schema.notRequired(),
    }),
    assignMapping: yup.string().when('integrationMethod', {
      is: 'Api',
      then: schema => schema.required('mapping description is required!'),
      otherwise: schema => schema.notRequired(),
    }),
    permissions: yup.string().required('app permission is required!'),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    resetField,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
      ? {
          app: defaultValues.app,
          integrationMethod: defaultValues.integrationMethod,
          token: defaultValues.token,
          assignMapping: defaultValues.assignMapping,
          permissions: defaultValues.permissions || 'read',
          projectType: 'existing', // Default for review mode
        }
      : {
          projectType: 'new',
          permissions: 'read',
        },
  });

  // Watch integration method to set active method
  const integrationMethod = watch('integrationMethod');

  useEffect(() => {
    if (integrationMethod) {
      setActiveMethod(integrationMethod);
    }
  }, [integrationMethod]);

  // Set default values when they are provided
  useEffect(() => {
    if (defaultValues) {
      console.log('🔄 Setting Version Control default values:', defaultValues);

      setValue('app', defaultValues.app);
      setValue('integrationMethod', defaultValues.integrationMethod);
      setValue('permissions', defaultValues.permissions || 'read');
      setValue('projectType', 'existing');

      if (defaultValues.token) {
        setValue('token', defaultValues.token);
      }
      if (defaultValues.assignMapping) {
        setValue('assignMapping', defaultValues.assignMapping);
      }

      // Set active method for UI state
      setActiveMethod(defaultValues.integrationMethod);
      setProjectType('existing');
    }
  }, [defaultValues, setValue]);

  const handleFormSubmit = async (data: FormValues) => {
    console.log('📝 STEP 3 FORM DATA:', data);
    console.log('🆕 Project ID for Step 3:', projectId);

    // Transform form data to match API schema
    const getIntegrationMethod = (method: string): 'oauth2' | 'api_key' => {
      if (method === 'OAuth') return 'oauth2';
      if (method === 'Api') return 'api_key';
      return 'oauth2';
    };

    const apiData: ProjectStep3Data = {
      vc_tool: data.app,
      vc_integration_method: getIntegrationMethod(data.integrationMethod),
      vc_repository_url: data.assignMapping || undefined,
      vc_api_key: data.integrationMethod === 'Api' ? data.token : undefined,
      vc_access_token:
        data.integrationMethod === 'OAuth' ? data.token : undefined,
    };

    console.log('📤 STEP 3 API PAYLOAD:', apiData);
    setStep3Data(apiData);

    if (!projectId) {
      console.log('No projectId available, skipping API call');
      toast.success('Version control setup saved locally');
      if (onSubmit) onSubmit();
      return;
    }

    updateProjectStep3.mutate(apiData, {
      onSuccess: responseData => {
        console.log('✅ Step 3 completed successfully:', responseData);
        toast.success('Version control configured!');
        if (onSubmit) onSubmit();
      },
      onError: (error: any) => {
        console.error('❌ Step 3 failed:', error);
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to configure version control';
        toast.error(errorMessage);
      },
    });
  };

  // Reset dependent fields when projectType or activeMethod changes
  useEffect(() => {
    setValue('projectType', projectType);
    if (!defaultValues) {
      resetField('token');
      resetField('assignMapping');
    }
  }, [projectType, activeMethod, setValue, resetField, defaultValues]);

  return (
    <div className="w-full">
      <StepHeader subTitle="Set up the tool for this project to help synchronize your activities with your preferred tool." />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Row 1 - Project Type */}
        {!defaultValues && (
          <Controller
            name="projectType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                defaultValue="new"
                onValueChange={value => {
                  field.onChange(value);
                  setProjectType(value);
                }}
                value={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="new"
                    id="new"
                    className="h-4 w-4 bg-gray-50 data-[state=checked]:border-[#086ACE] data-[state=checked]:fill-[#086ACE]"
                  />
                  <Label htmlFor="new">New project</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="existing"
                    id="existing"
                    className="h-4 w-4 bg-gray-50 data-[state=checked]:border-[#086ACE] data-[state=checked]:fill-[#086ACE]"
                  />
                  <Label htmlFor="existing">Existing project</Label>
                </div>
              </RadioGroup>
            )}
          />
        )}

        {/* Row 2 */}
        <div className="my-[32px] flex w-full items-baseline justify-between">
          <div className="grid w-full max-w-md items-center gap-[10px]">
            <Label className="block text-[16px] font-[400]">App</Label>
            <Controller
              name="app"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!!defaultValues}
                >
                  <SelectTrigger className="h-[40px] w-[100%] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50">
                    <SelectValue placeholder="Select App" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>App</SelectLabel>
                      <SelectItem value="Github">Github</SelectItem>
                      <SelectItem value="Gitlab">Gitlab</SelectItem>
                      <SelectItem value="Bitbucket">Bitbucket</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.app && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors.app.message}
              </span>
            )}
          </div>

          <div className="grid w-full max-w-md items-center gap-[10px]">
            <Label className="block text-[16px] font-[400]">
              Integration Method
            </Label>
            <Controller
              name="integrationMethod"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={value => {
                    field.onChange(value);
                    setActiveMethod(value);
                  }}
                  value={field.value}
                  disabled={!!defaultValues}
                >
                  <SelectTrigger className="h-[40px] w-[100%] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50">
                    <SelectValue placeholder="Select integration method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Integration Method</SelectLabel>
                      <SelectItem value="OAuth">OAuth2.0</SelectItem>
                      <SelectItem value="Api">API Key</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {defaultValues && (
              <span className="text-iq-suc-300 flex items-center gap-1 text-[14px]">
                <span className="icon-[material-symbols-light--check-circle-outline-rounded] size-4"></span>
                Successfully connected
              </span>
            )}
            {errors.integrationMethod && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors.integrationMethod.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 3 - API Info */}
        {activeMethod === 'Api' && (
          <>
            {!defaultValues && (
              <div className="mb-[32px]">
                <ol className="list-inside list-decimal text-[14px] text-neutral-500">
                  <li>
                    Go to your version control platform (e.g.,{' '}
                    <Link
                      href=""
                      className="border-b border-neutral-600 font-semibold"
                    >
                      GitHub
                    </Link>
                    ) and create an API key.
                  </li>
                  <li>Paste the generated key below.</li>
                </ol>
              </div>
            )}

            <div className="my-[32px] flex w-full justify-between gap-3">
              <div className="grid flex-1 gap-[10px]">
                <Label htmlFor="token" className="block text-[16px] font-[400]">
                  Access Token
                </Label>
                <Input
                  type="text"
                  placeholder="Enter access token"
                  id="token"
                  className="h-[40px] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0"
                  {...register('token')}
                  disabled={!!defaultValues}
                />
                {errors.token && (
                  <span className="text-iq-err-300 pl-2 text-[13px]">
                    {errors.token.message}
                  </span>
                )}
              </div>

              <div className="grid w-full flex-1 gap-[10px]">
                <Label
                  htmlFor="assignMapping"
                  className="block text-[16px] font-[400]"
                >
                  Assign Mapping
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. This repo is for backend"
                  id="assignMapping"
                  className="h-[40px] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0"
                  {...register('assignMapping')}
                  disabled={!!defaultValues}
                />
                {errors.assignMapping && (
                  <span className="text-iq-err-300 pl-2 text-[13px]">
                    {errors.assignMapping.message}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Row 4 - Permissions */}
        <div className="my-[32px] flex w-full justify-between gap-3">
          <div className="grid w-full gap-[10px]">
            <Label
              htmlFor="permissions"
              className="block text-[16px] font-[400]"
            >
              App Permissions
            </Label>
            <Controller
              name="permissions"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!!defaultValues}
                >
                  <SelectTrigger className="h-[40px] w-[100%] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50">
                    <SelectValue placeholder="Select permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Permissions</SelectLabel>
                      <SelectItem value="read">Read Only</SelectItem>
                      <SelectItem value="write">Write Access</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.permissions && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors.permissions.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button - Only show when not in review mode */}
        {!hideButton && !defaultValues && activeMethod && (
          <Button
            variant="outline"
            className="h-[60px] w-full bg-[#086ACE] text-[16px] text-gray-50 enabled:hover:bg-[#8EA8C2] enabled:hover:text-gray-50 disabled:cursor-not-allowed disabled:bg-[#8EA8C2]"
            disabled={
              (activeMethod === 'OAuth' && !connected) ||
              updateProjectStep3.isPending
            }
            type="submit"
          >
            {updateProjectStep3.isPending ? 'Saving...' : 'Next'}
          </Button>
        )}
      </form>
    </div>
  );
};

export default VersionControlSetup;
