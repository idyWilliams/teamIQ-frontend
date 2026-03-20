import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Check, Loader, SearchIcon } from 'lucide-react';
import { format, isBefore } from 'date-fns';
import { validateDate } from '@/helper/helperFns';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import StepHeader from '../steps/step-header';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useCreateProjectStep1 } from '@/services/hooks/useProject';
import { toast } from 'sonner';
import { useProjectStore } from '@/store/useProjectstore';
import {
  useOrganizationUsers,
} from '@/services/hooks/useUsers'; // Add this import
import { DatePicker } from '@/components/date-picker';

// dummy data for stack selection
const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
];

// Setting up Schema for form inputes and needed variables
const allowedImageTypes = [
  'image/jpeg', // .jpg and .jpeg
  'image/png', // .png
  'image/webp', // .webp
];

const allowedDocTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface ProjectDetailsProps {
  onSubmit?: (data: {
    projectId: number;
    projectData: any;
    step1Data: any;
  }) => void;
  hideButton?: boolean;
  defaultValues?: {
    projectName: string;
    description: string;
    stack: string[];
    startDate: Date;
    endDate: Date;
    visibility: boolean;
    projectLead?: string;
    projectLeadId?: number;
  };
}

const NewProjectDetails = ({
  onSubmit,
  hideButton,
  defaultValues,
}: ProjectDetailsProps) => {
  const imgUploadRef = useRef<HTMLInputElement | null>(null);
  const docRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>('');
  const [docs, setDocs] = useState<File[]>([]);
  const [docsErr, setDocsErr] = useState(false);

  const [open, setOpen] = useState(false);
  const [stacks, setStacks] = useState<string[]>([]);

  // Calender States
  const [startMonthValue, setStartMonthValue] = useState<Date | undefined>();
  const [endMonthValue, setEndMonthValue] = useState<Date | undefined>();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Project lead states
  const [projectLead, setProjectLead] = useState('');
  const [projectLeadId, setProjectLeadId] = useState<number | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useOrganizationUsers();

  const setStep1Data = useProjectStore(state => state.setStep1Data);

  // Fn for Handling File Upload
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (isReviewMode) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    if (e.target.files)
      setValue('image', e.target.files, { shouldValidate: true });
  }

  // Fn for Handling Docs Upload
  function handleDocUpload(e: ChangeEvent<HTMLInputElement>) {
    if (isReviewMode) return;

    const files = e.target.files;
    if (!files || files.length < 1) return;
    setDocsErr(false);

    for (let i = 0; i < files.length; i++) {
      if (!allowedDocTypes.includes(files[i].type)) {
        return setDocsErr(true);
      }
    }
    const filesArray = Array.from(files);
    const combinedFiles = [...(docs ?? []), ...filesArray];
    setDocs(combinedFiles);
  }

  // Delete doc fn
  function deleteDoc(idx: number) {
    if (isReviewMode) return;

    const updatedDocs = docs.filter((_, index) => index !== idx);
    setDocs(updatedDocs);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  interface FormValues {
    projectName: string;
    description: string;
    stack: string[];
    image: FileList;
    startDate: Date;
    endDate: Date;
    visibility: boolean;
  }

  const schema = yup.object().shape({
    projectName: yup.string().required('project name is required!'),
    description: yup.string().required('project description is required!'),
    stack: yup
      .mixed<string[]>()
      .required('project stack is required!')
      .test(
        'atLeastOne',
        'select at least one stack',
        value => value && value.length > 0
      ),
    image: yup
      .mixed<FileList>()
      .required('project image is required!')
      .test('fileType', 'image can be either of jpeg,png,webp', value => {
        if (!value || value.length === 0) return false;
        return allowedImageTypes.includes(value[0].type);
      }),
    startDate: yup
      .date()
      .required('start date is required!')
      .min(today, 'start date cannot be in the past'),
    endDate: yup
      .date()
      .required('end date is required!')
      .min(yup.ref('startDate'), 'end date must be after start date'),
    visibility: yup.boolean().required('this is field is required'),
  });

  const {
    register,
    control,
    formState: { errors },
    setValue,
    resetField,
    trigger,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: isReviewMode ? undefined : yupResolver(schema),
    defaultValues: defaultValues
      ? {
          projectName: defaultValues.projectName,
          description: defaultValues.description,
          stack: defaultValues.stack,
          startDate: defaultValues.startDate,
          endDate: defaultValues.endDate,
          visibility: defaultValues.visibility,
        }
      : undefined,
  });
  const createProjectMutation = useCreateProjectStep1();

  // Check if we're in review mode
  useEffect(() => {
    if (defaultValues) {
      setIsReviewMode(true);
    }
  }, [defaultValues]);

  // Set project lead from default values
  useEffect(() => {
    if (defaultValues?.projectLeadId && users) {
      const user = users.find(u => u.id === defaultValues.projectLeadId);
      if (user) {
        const userName = `${user.first_name} ${user.last_name}`.trim();
        setProjectLead(userName);
        setProjectLeadId(user.id);
      }
    }
  }, [defaultValues, users]);

  const handleProjectLeadChange = (userId: string) => {
    if (isReviewMode) return;

    const user = users?.find(u => u.id.toString() === userId);
    if (user) {
      const userName = `${user.first_name} ${user.last_name}`.trim();
      setProjectLead(userName);
      setProjectLeadId(user.id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFormSubmit = async (formData: FormValues) => {
    // Skip API call in review mode
    if (isReviewMode) {
      if (onSubmit) {
        onSubmit({
          projectId: 0,
          projectData: {},
          step1Data: formData,
        });
      }
      return;
    }

    if (!projectLeadId) {
      toast.error('Please select a project lead');
      return;
    }

    const selectedUser = users?.find(u => u.id === projectLeadId);
    const projectLeadName = selectedUser
      ? `${selectedUser.first_name} ${selectedUser.last_name}`.trim()
      : 'Project Lead';

    const apiData = {
      name: formData.projectName,
      description: formData.description,
      project_lead_id: projectLeadId,
      project_lead_name: projectLeadName,
      stacks: formData.stack || [],
      start_date: formData.startDate?.toISOString() || new Date().toISOString(),
      end_date: formData.endDate?.toISOString() || new Date().toISOString(),
      linked_documents: docs.map(doc => doc.name),
      project_image: preview || 'test-image',
      is_visible: formData.visibility,
    };

    setStep1Data(apiData);

    createProjectMutation.mutate(apiData, {
      onSuccess: responseData => {
        const projectId = responseData.data.project_id;
        const projectData = responseData.data.project;

        toast.success('Project created successfully!');

        if (onSubmit) {
          onSubmit({
            projectId: projectId,
            projectData: projectData,
            step1Data: apiData,
          });
        }
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to create project';
        toast.error(errorMessage);
      },
    });
  };

  // checking and keeping valid start date in sync with RHF variable
  useEffect(() => {
    const isValidStartDate = validateDate(startMonthValue);
    if (isValidStartDate) {
      setValue('startDate', isValidStartDate, { shouldValidate: true });
    }
  }, [startMonthValue, setValue]);

  // checking and keeping valid end date in sync with RHF variable
  useEffect(() => {
    if (
      !startMonthValue ||
      !endMonthValue ||
      !isBefore(startMonthValue, endMonthValue)
    ) {
      setEndMonthValue(undefined);
      resetField('endDate');
      return;
    }

    const isValidEndDate = validateDate(endMonthValue);
    if (isValidEndDate) {
      setValue('endDate', isValidEndDate, { shouldValidate: true });
    }
  }, [startMonthValue, endMonthValue, setValue, resetField, trigger]);

  useEffect(() => {
    if (defaultValues) {
      setValue('projectName', defaultValues.projectName);
      setValue('description', defaultValues.description);
      setValue('stack', defaultValues.stack);
      setValue('startDate', defaultValues.startDate);
      setValue('endDate', defaultValues.endDate);
      setValue('visibility', defaultValues.visibility);

      setStacks(defaultValues.stack);
      setStartMonthValue(defaultValues.startDate);
      setEndMonthValue(defaultValues.endDate);
    }
  }, [defaultValues, setValue]);

  useEffect(() => {
    setValue('stack', stacks, { shouldValidate: true });
  }, [stacks, setValue]);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-[28px] flex max-h-[100%] flex-col gap-[24px] overflow-y-auto px-2 text-neutral-800"
      >
        <div>
          <Input
            type="text"
            className="border-none p-2 !text-[26px] font-bold shadow-none !ring-0 placeholder:text-[26px]"
            placeholder="Project Name"
            {...register('projectName')}
            disabled={isReviewMode}
          />
          {errors?.projectName && (
            <span className="text-iq-err-300 pl-2 text-[13px]">
              {errors?.projectName?.message}
            </span>
          )}
        </div>
        <div>
          <Textarea
            className="resize-none border-none bg-neutral-50 text-[14px] shadow-none !ring-0 placeholder:text-neutral-500"
            placeholder="Description..."
            {...register('description')}
            disabled={isReviewMode}
          />
          {errors?.description && (
            <span className="text-iq-err-300 pl-2 text-[13px]">
              {errors?.description?.message}
            </span>
          )}
        </div>
        <div>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imgUploadRef}
            onChange={e => handleFileChange(e)}
          />
          <div
            className={`relative flex h-[137px] flex-col items-center justify-center overflow-hidden rounded-[8px] bg-neutral-50 ${
              isReviewMode ? '' : 'cursor-pointer'
            }`}
            onClick={() => !isReviewMode && imgUploadRef?.current?.click?.()}
          >
            {preview ? (
              <Image
                src={preview}
                alt=""
                fill={true}
                className="object-cover"
              />
            ) : defaultValues ? (
              <div className="text-center">
                <span className="icon-[material-symbols--check-circle] size-7 text-green-500"></span>
                <p className="text-[14px] text-green-600">Image uploaded</p>
              </div>
            ) : (
              <>
                <span className="icon-[et--upload] size-7"></span>
                <p className="text-[14px]">Upload project image</p>
              </>
            )}
          </div>
        </div>

        {/*Form Row 1 */}
        <div className="flex w-full items-baseline justify-between">
          <div className="grid w-full max-w-[48%] items-center gap-[10px]">
            <Label className="block text-[16px] font-[400]">
              Assign Project Lead
            </Label>

            {usersLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-500">Loading users...</span>
              </div>
            ) : usersError ? (
              <div className="text-sm text-red-500">Failed to load users</div>
            ) : (
              <Select
                onValueChange={handleProjectLeadChange}
                value={projectLeadId?.toString() || ''}
                disabled={isReviewMode}
              >
                <SelectTrigger className="h-[40px] w-[100%] border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50">
                  <SelectValue placeholder="Select project lead">
                    {projectLead ? (
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs">
                          {getInitials(projectLead)}
                        </div>
                        <span>{projectLead}</span>
                      </div>
                    ) : (
                      'Select project lead'
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Team Members</SelectLabel>
                    {users?.map(user => {
                      const userName =
                        `${user.first_name} ${user.last_name}`.trim();
                      return (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <span className="text-sm">{userName}</span>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid w-full max-w-[48%] gap-[10px]">
            <Label htmlFor="stack" className="block text-[16px] font-[400]">
              Add Stack
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="">
                <InputGroup className="border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0 focus:border-[#B3C4D6]">
                  <div className="flex h-full w-[100%] items-center justify-between overflow-hidden rounded-[8px] bg-neutral-50 px-3 text-[13px] text-neutral-400 !ring-0 focus:border-[#B3C4D6]">
                    {stacks.length < 1
                      ? 'Search required stack'
                      : stacks.join(', ')}
                  </div>
                  {!isReviewMode && (
                    <InputGroupAddon align="inline-end">
                      <SearchIcon />
                    </InputGroupAddon>
                  )}
                </InputGroup>
              </PopoverTrigger>
              {!isReviewMode && (
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map(framework => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={currentStack => {
                              const alreadExists =
                                stacks.includes(currentStack);
                              if (!alreadExists) {
                                const newValues = [...stacks, currentStack];
                                setStacks(newValues);
                                setOpen(false);
                                return;
                              }
                              const filteredValues = stacks.filter(
                                stack => stack !== currentStack
                              );
                              setStacks(filteredValues);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                stacks.includes(framework.value)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              )}
            </Popover>
            {errors?.stack && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors?.stack?.message}
              </span>
            )}
          </div>
        </div>

        {/*Form Row 2 */}
        <div className="flex w-full justify-between">
          <div className="grid w-full max-w-[48%] gap-[10px]">
            <Label
              htmlFor="start_date"
              className="block text-[16px] font-[400]"
            >
              Start date
            </Label>
            <InputGroup className="border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0 focus:border-[#B3C4D6]">
              <InputGroupInput
                id="start_date"
                placeholder="Select date..."
                disabled
                value={
                  startMonthValue &&
                  validateDate(startMonthValue) &&
                  format(startMonthValue, 'dd MMM, yyyy')
                }
              />
              {!isReviewMode && (
                <InputGroupAddon align="inline-end">
                  <DatePicker
                    setValue={setStartMonthValue}
                    open={showStartDatePicker}
                    setOpen={setShowStartDatePicker}
                  />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors?.startDate && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors?.startDate?.message}
              </span>
            )}
          </div>

          <div className="grid w-full max-w-[48%] gap-[10px]">
            <Label htmlFor="end_date" className="block text-[16px] font-[400]">
              End date
            </Label>
            <InputGroup className="border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0 focus:border-[#B3C4D6]">
              <InputGroupInput
                id="end_date"
                placeholder="Select date..."
                className="placeholder:text-neutral-500"
                disabled
                value={
                  endMonthValue ? format(endMonthValue, 'dd MMM, yyyy') : ''
                }
              />
              {!isReviewMode && (
                <InputGroupAddon align="inline-end">
                  <DatePicker
                    setValue={setEndMonthValue}
                    open={showEndDatePicker}
                    setOpen={setShowEndDatePicker}
                  />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors?.endDate && (
              <span className="text-iq-err-300 pl-2 text-[13px]">
                {errors?.endDate?.message}
              </span>
            )}
          </div>
        </div>

        {/* Form Row 3 */}
        <div className="grid w-full gap-[10px]">
          <Label htmlFor="docs" className="block text-[16px] font-[400]">
            Linked Documents
          </Label>
          <InputGroup className="justify-between overflow-hidden border-0 border-b-[1.5px] border-[#B3C4D6] bg-neutral-50 !ring-0 focus:border-[#B3C4D6]">
            <div className="flex h-full w-full max-w-[90%] items-center gap-2 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Show uploaded documents if any exist */}
              {docs.length > 0 ? (
                docs.map((doc, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="relative overflow-visible bg-[#086ACE] text-white dark:bg-blue-600"
                  >
                    {doc?.name.length > 20
                      ? doc?.name.slice(0, 15) +
                        '...  ' +
                        doc?.name.slice(
                          doc?.name?.lastIndexOf('.'),
                          doc?.name?.length
                        )
                      : doc?.name}
                    {!isReviewMode && (
                      <span
                        className="icon-[carbon--close-filled] absolute top-[-6px] right-[-6px] flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
                        onClick={() => deleteDoc(idx)}
                      ></span>
                    )}
                  </Badge>
                ))
              ) : /* Show "uploaded" message when in review mode with defaultValues */
              defaultValues ? (
                <span className="text-[14px] text-green-600">
                  Documents uploaded
                </span>
              ) : (
                /* Show upload prompt for new forms */
                <span className="text-[14px] text-neutral-500">
                  Upload required documents
                </span>
              )}
            </div>
            {!isReviewMode && (
              <InputGroupAddon align="inline-end">
                <span
                  className="text-iq-500 cursor-pointer"
                  onClick={() => docRef?.current?.click?.()}
                >
                  Upload
                </span>
              </InputGroupAddon>
            )}
          </InputGroup>

          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            className="hidden"
            ref={docRef}
            onChange={handleDocUpload}
            multiple
          />
          {docsErr && (
            <span className="text-iq-err-300 pl-2 text-[13px]">
              document(s) can be either PDF or DOCX files
            </span>
          )}
        </div>

        {/* Form Row 4 */}
        <div className="flex items-center gap-[10px]">
          <Label
            htmlFor="project_visible"
            className="cursor-pointer text-[16px]"
          >
            Make project visible
          </Label>
          <Controller
            name="visibility"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch
                id="project_visible"
                checked={field.value}
                onCheckedChange={checked =>
                  !isReviewMode && field.onChange(checked)
                }
                className={`cursor-pointer data-[state=checked]:bg-[#1581FE] ${
                  isReviewMode ? 'cursor-default opacity-50' : ''
                }`}
                disabled={isReviewMode}
              />
            )}
          />
        </div>

        {/* Submit Button - Only show when not in review mode */}
        {!hideButton && !isReviewMode && (
          <Button
            type="submit"
            variant={'outline'}
            disabled={createProjectMutation.isPending || !projectLeadId}
            className="h-[60px] cursor-pointer bg-[#086ACE] text-[16px] text-gray-50 hover:bg-[#8EA8C2] hover:text-gray-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {createProjectMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" />
              </div>
            ) : (
              'Next'
            )}
          </Button>
        )}
      </form>
    </div>
  );
};

export default NewProjectDetails;
