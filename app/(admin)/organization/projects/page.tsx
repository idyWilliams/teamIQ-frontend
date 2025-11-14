'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Circle, Plus, Loader, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  useProjects,
  type Project as ApiProject,
} from '@/services/hooks/useProjectGet';
import StepperModal from './components/stepper-components/steps/stepper-modal';

/* ----------------------------------------------------------------------
   🧩 IMAGE WRAPPER COMPONENT
------------------------------------------------------------------------ */
type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => (
  <div
    style={{
      width: width ? `${width}px` : '100%',
      height: height ? `${height}px` : '100%',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    className={className}
    title={alt}
  />
);

/* ----------------------------------------------------------------------
   📁 TRANSFORMED PROJECT TYPE FOR TABLE
------------------------------------------------------------------------ */
type TableProject = {
  id: number;
  name: string;
  app: string[];
  teamLead: string;
  teamMembers: string[];
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Complete' | 'Pending';
  progress: number;
};

/* ----------------------------------------------------------------------
   🧭 ICON MAP
------------------------------------------------------------------------ */
const iconMap: Record<string, string> = {
  slack: '/images/slack.png',
  jira: '/images/jira.png',
  github: '/images/github.png',
  gitlab: '/images/gitlab.png',
  figma: '/images/figma.png',
  firebase: '/images/clickup.png',
  // Add more mappings as needed
};

/* ----------------------------------------------------------------------
   🛠️ UTILITY FUNCTIONS
------------------------------------------------------------------------ */
// Transform API project to table project format
const transformProject = (apiProject: ApiProject): TableProject => {
  // Determine apps used based on integration tools
  const apps: string[] = [];
  if (apiProject.pm_tool) apps.push(apiProject.pm_tool.toLowerCase());
  if (apiProject.vc_tool) apps.push(apiProject.vc_tool.toLowerCase());
  if (apiProject.comm_tool) apps.push(apiProject.comm_tool.toLowerCase());

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Determine status based on project data
  const getStatus = (
    project: ApiProject
  ): 'In Progress' | 'Complete' | 'Pending' => {
    if (project.pct_complete === 100) return 'Complete';
    if (project.pct_complete > 0) return 'In Progress';
    return 'Pending';
  };

  return {
    id: apiProject.id,
    name: apiProject.name,
    app: apps,
    teamLead: apiProject.project_lead_id
      ? `User ${apiProject.project_lead_id}`
      : 'Not assigned',
    teamMembers: apiProject.stacks.slice(0, 3).map(stack => stack), // Using stacks as placeholder for team members
    startDate: formatDate(apiProject.start_date),
    endDate: formatDate(apiProject.end_date),
    status: getStatus(apiProject),
    progress: apiProject.pct_complete,
  };
};

/* ----------------------------------------------------------------------
   🧱 MAIN PROJECTS PAGE
------------------------------------------------------------------------ */
export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState([{ id: 'progress', desc: true }]);
  const columnHelper = createColumnHelper<TableProject>();

  // Use the projects hook
  const { data: apiProjects, isLoading, error } = useProjects();

  // Transform API data to table format
  const projects: TableProject[] = useMemo(() => {
    if (!apiProjects) return [];
    return apiProjects.map(transformProject);
  }, [apiProjects]);

  console.log('projects......', projects);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Project Name',
        cell: info => (
          <Link
            href={`/organization/projects/${info.row.original.id}`}
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600"
          >
            {info.getValue()}
          </Link>
        ),
      }),

      columnHelper.accessor('app', {
        header: 'App',
        cell: info => (
          <div className="flex items-center gap-2">
            {info.getValue().length > 0 ? (
              info
                .getValue()
                .map((app, i) => (
                  <Image
                    key={i}
                    src={iconMap[app] || '/images/default-app.png'}
                    alt={app}
                    width={22}
                    height={22}
                    className="rounded-full border border-gray-200"
                  />
                ))
            ) : (
              <span className="text-xs text-gray-400">No apps</span>
            )}
          </div>
        ),
      }),

      columnHelper.accessor('teamLead', {
        header: 'Team Lead',
        cell: info => (
          <div className="flex items-center gap-3">
            <Image
              src="/images/profile.2.jpg"
              alt="Lead"
              width={28}
              height={28}
              className="rounded-full border border-gray-300 object-cover"
            />
            {/* <span className="font-medium text-gray-700">{info.getValue()}</span> */}
          </div>
        ),
      }),

      columnHelper.accessor('teamMembers', {
        header: 'Team Members',
        cell: info => {
          const members = info.getValue();
          return (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {members.slice(0, 2).map((member, i) => (
                  <Image
                    key={i}
                    src="/images/member.png"
                    alt={member}
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              {members.length > 2 && (
                <span className="ml-3 text-xs font-semibold text-gray-600">
                  +{members.length - 2}
                </span>
              )}
              {members.length === 0 && (
                <span className="text-xs text-gray-400">No members</span>
              )}
            </div>
          );
        },
      }),

      columnHelper.accessor('startDate', {
        header: 'Start Date',
        cell: info => (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={10} />
            {info.getValue()}
          </div>
        ),
      }),

      columnHelper.accessor('endDate', {
        header: 'End Date',
        cell: info => (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={10} />
            {info.getValue()}
          </div>
        ),
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          const dotColor =
            status === 'Complete'
              ? 'green'
              : status === 'In Progress'
                ? 'blue'
                : 'orange';
          return (
            <div className="flex items-center gap-2">
              <Circle size={8} fill={dotColor} />
              <span className="font-medium text-gray-700">{status}</span>
            </div>
          );
        },
      }),

      columnHelper.accessor('progress', {
        header: 'Progress',
        cell: info => (
          <div className="flex w-full min-w-[100px] items-center gap-2">
            <Progress value={info.getValue()} className="flex-1" />
            <span className="text-xs text-gray-500">{info.getValue()}%</span>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <Loader className="mr-3 h-8 w-8 animate-spin" />
          <span className="text-lg">Loading projects...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <div className="mb-2 text-lg text-red-500">
              Failed to load projects
            </div>
            <div className="mb-4 text-gray-600">{error.message}</div>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
          Projects {projects.length > 0 && `(${projects.length})`}
        </h1>
        {projects.length > 0 && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={18} /> New Project
          </Button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 text-lg text-gray-500">No projects found</div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mx-auto flex items-center gap-2"
          >
            <Plus size={18} /> Create Your First Project
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b bg-gray-100">
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="cursor-pointer p-2 text-left font-semibold text-gray-500 hover:text-blue-600"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted()
                          ? header.column.getIsSorted() === 'asc'
                            ? ' 🔼'
                            : ' 🔽'
                          : ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-t transition hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-2">
                        <Link
                          href={`/organization/projects/${row.original.id}`}
                          className="block h-full w-full"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-gray-200 py-4 text-sm sm:flex-row">
            <p className="text-gray-600">
              Showing{' '}
              <span className="font-semibold">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
                –
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  projects.length
                )}
              </span>{' '}
              of {projects.length} projects
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous
              </Button>
              <Button
                size="sm"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Add Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] w-[900px] overflow-y-auto !pt-0 sm:!max-w-[900px] [&>button]:hidden">
          <StepperModal onClose={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
