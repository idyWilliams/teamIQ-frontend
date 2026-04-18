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
import {
  Calendar,
  Circle,
  Plus,
  Loader,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useCreatedProjects,
  useDeleteProject,
  type CreatedProject,
} from '@/services/hooks/useProjectGet';
import StepperModal from './components/stepper-components/steps/stepper-modal';
import { useRouter } from 'next/navigation';

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
   📁 TYPE DEFINITIONS
------------------------------------------------------------------------ */

// This matches the structure you want to display in the table
type TableProject = {
  id: number;
  name: string;
  app: string[];
  teamLead: {
    name: string;
    avatar?: string;
  };
  teamMembers: Array<{
    id: number;
    name: string;
    avatar?: string;
  }>;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Active';
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
  clickup: '/images/clickup.png', // Renamed from firebase based on your data example
  firebase: '/images/firebase.png',
};

/* ----------------------------------------------------------------------
   🛠️ UTILITY FUNCTIONS
------------------------------------------------------------------------ */
const transformProject = (apiProject: any): TableProject => {
  // 1. Determine Apps
  const apps = new Set<string>();

  // Check direct tool fields
  if (apiProject.pm_tool) apps.add(apiProject.pm_tool.toLowerCase());
  if (apiProject.vc_tool) apps.add(apiProject.vc_tool.toLowerCase());
  if (apiProject.comm_tool) apps.add(apiProject.comm_tool.toLowerCase());

  // Check integrated_apps array
  if (Array.isArray(apiProject.integrated_apps)) {
    apiProject.integrated_apps.forEach((app: any) => {
      if (app.provider) apps.add(app.provider.toLowerCase());
    });
  }

  // 2. Format Dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // 3. Determine Status
  // Your API returns "active", but the table expects 'In Progress' | 'Complete' | 'Pending'
  // We can map 'active' to 'In Progress' or keep it as is if we update the type.
  // I updated the type to include 'Active'.
  let status: TableProject['status'] = 'Pending';

  if (apiProject.status === 'active') status = 'Active';
  else if (apiProject.pct_complete === 100) status = 'Complete';
  else if (apiProject.pct_complete > 0) status = 'In Progress';

  // 4. Get User Full Name Helper
  const getFullName = (user: any) => {
    if (!user) return 'Unknown';
    if (user.first_name || user.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user.user_name || user.username || user.email || 'Unknown';
  };

  // 5. Determine Team Lead
  // Priority: project_lead_name -> member with role 'lead'/'team_lead' -> 'Not assigned'
  let leadName = 'Not assigned';
  let leadAvatar = '/images/profile.2.jpg';

  if (apiProject.project_lead_name) {
    leadName = apiProject.project_lead_name;
    // We might need to find the avatar from members array if name matches
    const leadUser = apiProject.members?.find((m: any) => m.user_name === leadName || m.name === leadName);
    if (leadUser) leadAvatar = leadUser.user_avatar || leadUser.profile_image || leadAvatar;
  } else if (Array.isArray(apiProject.members)) {
    const leadMember = apiProject.members.find((m: any) =>
      m.role === 'team_lead' || m.role === 'lead'
    );
    if (leadMember) {
      leadName = leadMember.user_name || getFullName(leadMember);
      leadAvatar = leadMember.user_avatar || leadMember.profile_image || leadAvatar;
    }
  }

  // 6. Map Team Members
  // Your example has a 'teamMembers' array with detailed user info. Use that.
  const members = Array.isArray(apiProject.teamMembers)
    ? apiProject.teamMembers.map((m: any) => ({
      id: m.id,
      name: getFullName(m),
      avatar: m.profile_image || '/images/member.png'
    }))
    : [];

  return {
    id: apiProject.id,
    name: apiProject.name,
    app: Array.from(apps),
    teamLead: {
      name: leadName,
      avatar: leadAvatar,
    },
    teamMembers: members,
    startDate: formatDate(apiProject.start_date),
    endDate: formatDate(apiProject.end_date),
    status: status,
    progress: apiProject.pct_complete || 0,
  };
};

/* ----------------------------------------------------------------------
   🧱 MAIN PROJECTS PAGE
------------------------------------------------------------------------ */
export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Deletion State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: number, name: string } | null>(null);

  const [sorting, setSorting] = useState([{ id: 'progress', desc: true }]);
  const columnHelper = createColumnHelper<TableProject>();
  const router = useRouter();

  // Use the projects hook
  const { data: apiProjects, isLoading, error } = useCreatedProjects();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  // Handle Delete Confirmation
  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  // Transform API data to table format
  const projects: TableProject[] = useMemo(() => {
    if (!apiProjects) return [];
    // Ensure apiProjects is an array before mapping
    const projectList = Array.isArray(apiProjects) ? apiProjects : [];
    return projectList.map(transformProject);
  }, [apiProjects]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Project Name',
        cell: info => (
          <span className="font-medium text-gray-700 transition-colors hover:text-blue-600">
            {info.getValue()}
          </span>
        ),
      }),

      columnHelper.accessor('app', {
        header: 'App',
        cell: info => (
          <div className="flex items-center gap-2">
            {info.getValue().length > 0 ? (
              info.getValue().map((app, i) => (
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
        cell: info => {
          const lead = info.getValue();
          return (
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-7 flex-shrink-0">
                <Image
                  src={lead.avatar || '/images/profile.2.jpg'}
                  alt={lead.name}
                  height={28}
                  width={28}
                  className="rounded-full border border-gray-300 object-cover"
                />
              </div>
              <span className="font-medium text-gray-700 text-xs sm:text-sm">
                {lead.name}
              </span>
            </div>
          );
        },
      }),

      columnHelper.accessor('teamMembers', {
        header: 'Team Members',
        cell: info => {
          const members = info.getValue();
          return (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((member, i) => (
                  <div key={i} className="relative h-7 w-7 hover:z-10 transition-transform hover:scale-110">
                    <Image
                      src={member.avatar || "/images/member.png"}
                      alt={member.name}
                      width={28}
                      height={28}
                      className="rounded-full border-2 border-white object-cover"
                    />
                  </div>
                ))}
              </div>
              {members.length > 3 && (
                <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-full h-7 w-7 flex items-center justify-center">
                  +{members.length - 3}
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
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs sm:text-sm">{info.getValue()}</span>
          </div>
        ),
      }),

      columnHelper.accessor('endDate', {
        header: 'End Date',
        cell: info => (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs sm:text-sm">{info.getValue()}</span>
          </div>
        ),
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          let dotColor = 'gray';
          if (status === 'Complete') dotColor = 'green';
          else if (status === 'In Progress' || status === 'Active') dotColor = 'blue';
          else if (status === 'Pending') dotColor = 'orange';

          return (
            <div className="flex items-center gap-2">
              <Circle size={8} fill={dotColor} className={dotColor === 'blue' ? 'text-blue-500' : dotColor === 'green' ? 'text-green-500' : 'text-orange-500'} />
              <span className="font-medium text-gray-700 capitalize">{status}</span>
            </div>
          );
        },
      }),

      columnHelper.accessor('progress', {
        header: 'Progress',
        cell: info => (
          <div className="flex w-full min-w-[80px] items-center gap-2">
            <Progress value={info.getValue()} className="flex-1 h-2" />
            <span className="text-xs text-gray-500 w-8">{info.getValue()}%</span>
          </div>
        ),
      }),

      // ACTIONS COLUMN
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const project = row.original;

          return (
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] bg-white z-50">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
``
                  <DropdownMenuItem
                    onClick={() => router.push(`/organization/projects/${project.id}`)}
                    className="cursor-pointer"
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push(`/organization/projects/${project.id}/edit`)}
                    className="cursor-pointer"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setProjectToDelete({ id: project.id, name: project.name });
                      setDeleteModalOpen(true);
                    }}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      }),
    ],
    [router, columnHelper]
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
            onClick={() => router.push('/organization/projects/create')}
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
            onClick={() => router.push('/organization/projects/create')}
            className="mx-auto flex items-center gap-2"
          >
            <Plus size={18} /> Create Your First Project
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full border-collapse text-sm">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b bg-gray-100">
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="cursor-pointer p-2 text-left font-semibold text-gray-500 hover:text-blue-600 whitespace-nowrap"
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
                    className="border-t transition hover:bg-gray-50 group"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-2 relative">
                        {/*
                            Logic Check:
                            If the column is 'actions', render it directly.
                            Otherwise, wrap it in a Link to the project details.
                        */}
                        {cell.column.id === 'actions' ? (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        ) : (
                          <Link
                            href={`/organization/projects/${row.original.id}`}
                            className="block h-full w-full"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        )}
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

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-bold text-gray-900">{projectToDelete?.name}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
