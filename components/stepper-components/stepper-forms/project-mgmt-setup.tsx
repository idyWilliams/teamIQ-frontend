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
  ProjectStep2Data,
  useUpdateProjectStep2,
} from '@/services/hooks/useProject';
import { toast } from 'sonner';
import { useProjectStore } from '@/store/useProjectstore';

interface ProjectMgmtSetupProps {
  onSubmit: () => void;
  hideButton: boolean;
  projectId?: number;
  defaultValues?: {
    app: string;
    integrationMethod: string;
    existingLink?: string;
    token?: string;
  };
}

const ProjectMgmtSetup = ({
  onSubmit,
  hideButton,
  projectId,
  defaultValues,
}: ProjectMgmtSetupProps) => {
  const [activeMethod, setActiveMethod] = useState('');
  const [projectType, setProjectType] = useState('new');
  const [connected, setConnected] = useState(false);

  const updateProjectStep2 = useUpdateProjectStep2(projectId || 0);
  const setStep2Data = useProjectStore(state => state.setStep2Data);

  interface FormValues {
    projectType: string;
    app: string;
    integrationMethod: string;
    existingLink?: string;
    token?: string;
  }

  // Typed schema
  const schema: yup.ObjectSchema<FormValues> = yup.object({
    projectType: yup.string().required('project type is required!'),
    app: yup.string().required('project app is required!'),
    integrationMethod: yup
      .string()
      .required('project integration method is required!'),

    existingLink: yup.string().when('projectType', {
      is: (val: string) => val === 'existing',
      then: field => field.required('Existing project link is required!'),
      otherwise: field => field.notRequired(),
    }),

    token: yup
      .string()
      .when(
        ['projectType', 'integrationMethod'],
        ([projectType, integrationMethod], field) => {
          if (projectType === 'new' && integrationMethod === 'Api') {
            return field.required('access token is required!');
          }
          return field.notRequired();
        }
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Set default values when they are provided
  useEffect(() => {
    if (defaultValues) {
      console.log('🔄 Setting Step 2 default values:', defaultValues);

      // Set form values
      setValue('app', defaultValues.app);
      setValue('integrationMethod', defaultValues.integrationMethod);
      if (defaultValues.existingLink) {
        setValue('existingLink', defaultValues.existingLink);
      }
      if (defaultValues.token) {
        setValue('token', defaultValues.token);
      }

      // Set component state
      setActiveMethod(defaultValues.integrationMethod);

      // Determine project type based on existingLink
      if (defaultValues.existingLink) {
        setProjectType('existing');
        setValue('projectType', 'existing');
      } else {
        setProjectType('new');
        setValue('projectType', 'new');
      }
    }
  }, [defaultValues, setValue]);

  // In your ProjectMgmtSetup component
  const handleFormSubmit = async (data: FormValues) => {
    console.log('STEP 2 FORM DATA:', data);
    console.log('🆕 Project ID for Step 2:', projectId); // This will now show the actual ID

    const getIntegrationMethod = (method: string): 'oauth2' | 'api_key' => {
      if (method === 'OAuth') return 'oauth2';
      if (method === 'Api') return 'api_key';
      return 'oauth2';
    };

    const apiData: ProjectStep2Data = {
      pm_tool: data.app,
      pm_integration_method: getIntegrationMethod(data.integrationMethod),
      pm_project_id: data.existingLink || undefined,
      pm_api_key: data.integrationMethod === 'Api' ? data.token : undefined,
      pm_access_token:
        data.integrationMethod === 'OAuth' ? data.token : undefined,
    };

    console.log('STEP 2 API PAYLOAD:', apiData);
    setStep2Data(apiData);

    if (!projectId) {
      // ✅ This will work with undefined too
      console.log('No projectId available, skipping API call');
      toast.success('Project management setup saved locally');
      onSubmit();
      return;
    }

    // ✅ Now this will execute when projectId exists!
    updateProjectStep2.mutate(apiData, {
      onSuccess: responseData => {
        console.log('Step 2 completed successfully:', responseData);
        toast.success('Project management tool configured!');
        onSubmit();
      },
      onError: (error: any) => {
        console.error('Step 2 failed:', error);
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to configure project management tool';
        toast.error(errorMessage);
      },
    });
  };

  useEffect(() => {
    setValue('projectType', projectType);
    resetField('existingLink');
    resetField('token');
  }, [projectType, activeMethod, setValue, resetField]);

  return (
    <div className="w-full">
      <StepHeader
        // projectTitle="Project Management Tool Setup"
        subTitle="Set up the project management tool for this project to help synchronize your activities with your preferred tool."
      />
      {/*Row 1 Radio Group  */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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

        {/* Row 2 */}
        <div className="my-[32px] flex w-full items-baseline justify-between gap-3">
          <div className="grid w-full max-w-md items-center gap-[10px]">
            <Label className="block text-[16px] font-[400]">App</Label>
            <Controller
              name="app"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-[40px] w-[100%] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50">
                    <SelectValue placeholder="Select App" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>App</SelectLabel>
                      <SelectItem value="Jira">Jira</SelectItem>
                      <SelectItem value="Clickup">Clickup</SelectItem>
                      <SelectItem value="Github">Github</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.app && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors?.app?.message}
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
                >
                  <SelectTrigger className="h-[40px] w-[100%] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50">
                    <SelectValue placeholder="Select integration method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>integration method</SelectLabel>
                      <SelectItem value="OAuth">OAuth2.0</SelectItem>
                      <SelectItem value="Api">Api key</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {true && (
              <span className="text-iq-suc-300 flex items-center gap-1 text-[14px]">
                <span className="icon-[material-symbols-light--check-circle-outline-rounded] size-4"></span>
                Successfully connected
              </span>
            )}
            {errors?.integrationMethod && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors?.integrationMethod?.message}
              </span>
            )}
          </div>
        </div>

        {/* Row 3 */}
        {activeMethod === 'Api' && (
          <div className="mb-[32px]">
            <ol className="list-inside list-decimal text-[14px] text-neutral-500">
              <li>
                Go to the{' '}
                <Link
                  href=""
                  className="border-b border-neutral-600 font-semibold"
                >
                  slack website
                </Link>{' '}
                and create a free account (you will need to confirm your email).
              </li>
              <li>After that go to your setting, under profile</li>
              <li>Click API key. Generate API and paste below.</li>
            </ol>
          </div>
        )}

        {/* Row 4 */}
        {activeMethod === 'OAuth' && projectType === 'existing' && (
          <div className="mb-[32px] grid w-full flex-1 gap-[10px]">
            <Label
              htmlFor="link_existing"
              className="block text-[16px] font-[400]"
            >
              Link an existing PMT project/board.
            </Label>
            <Input
              type="text"
              placeholder="Enter the link to the PMT board"
              className="h-[40px] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0"
              id="link_existing"
              {...register('existingLink')}
            />
            {errors?.existingLink && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors?.existingLink?.message}
              </span>
            )}
          </div>
        )}
        {activeMethod === 'OAuth' && projectType === 'new' && (
          <Button
            variant={'outline'}
            className="mb-[40px] w-[173px] cursor-pointer bg-neutral-100 text-[16px] hover:bg-neutral-200"
          >
            Connect
          </Button>
        )}

        {activeMethod === 'Api' && (
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
              />
              {errors?.token && (
                <span className="text-iq-err-300 pl-2 text-[13px]">
                  {errors?.token?.message}
                </span>
              )}
            </div>

            {projectType === 'existing' && (
              <div className="grid w-full flex-1 gap-[10px]">
                <Label
                  htmlFor="link_existing"
                  className="block text-[16px] font-[400]"
                >
                  Link an existing PMT project/board.
                </Label>
                <Input
                  type="text"
                  placeholder="Enter the link to the PMT board"
                  className="h-[40px] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0"
                  id="link_existing"
                  {...register('existingLink')}
                />
                {errors?.existingLink && (
                  <span className="text-iq-err-300 pl-2 text-[13px]">
                    {errors?.existingLink?.message}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {!hideButton && activeMethod && (
          <button
            type="submit"
            className="h-[60px] w-full cursor-pointer rounded-[8px] bg-[#086ACE] text-[16px] text-gray-50 hover:bg-[#8EA8C2] hover:text-gray-50 disabled:cursor-not-allowed disabled:bg-[#8EA8C2]"
            disabled={
              (activeMethod === 'OAuth' && !connected) ||
              updateProjectStep2.isPending
            }
          >
            {updateProjectStep2.isPending ? 'Saving...' : 'Next'}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProjectMgmtSetup;
