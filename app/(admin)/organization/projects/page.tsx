'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Circle, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
   📁 PROJECT TYPE + MOCK DATA
------------------------------------------------------------------------ */
type Project = {
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

const projects: Project[] = [
  {
    id: 1,
    name: 'Project XYZ',
    app: ['slack', 'jira', 'gitlab'],
    teamLead: 'Kate Morrison',
    teamMembers: ['Mia', 'Tom', 'Leo', 'Tina'],
    startDate: 'Feb 15, 2025',
    endDate: 'Apr 20, 2025',
    status: 'In Progress',
    progress: 65,
  },
  {
    id: 2,
    name: "Project ABC",
    app: ["slack", "github"],
    teamLead: "Kate Morrison",
    teamMembers: ["Ava", "Ryan", "Noah"],
    startDate: "Jan 20, 2025",
    endDate: "Mar 30, 2025",
    status: "Pending",
    progress: 25,
  },
  {
    id: 3,
    name: "Project LMN",
    app: ["github", "firebase", "slack"],
    teamLead: "Kate Morrison",
    teamMembers: ["Fatima", "Sifan", "Adefolayo"],
    startDate: "Jan 10, 2025",
    endDate: "Jun 1, 2025",
    status: "Complete",
    progress: 100,
  },
  {
    id: 4,
    name: "Project XYZ",
    app: ["slack", "jira", "gitlab"],
    teamLead: "Kate Morrison",
    teamMembers: ["Mia", "Tom", "Leo", "Tina"],
    startDate: "Feb 15, 2025",
    endDate: "Apr 20, 2025",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 5,
    name: "Project ABC",
    app: ["slack", "github"],
    teamLead: "Kate Morrison",
    teamMembers: ["Ava", "Ryan", "Noah"],
    startDate: "Jan 20, 2025",
    endDate: "Mar 30, 2025",
    status: "Pending",
    progress: 25,
  },
  {
    id: 6,
    name: "Project LMN",
    app: ["github", "firebase", "slack"],
    teamLead: "Kate Morrison",
    teamMembers: ["Fatima", "Sifan", "Adefolayo"],
    startDate: "Jan 10, 2025",
    endDate: "Jun 1, 2025",
    status: "Complete",
    progress: 100,
  },
  {
    id: 7,
    name: "Project XYZ",
    app: ["slack", "jira", "gitlab"],
    teamLead: "Kate Morrison",
    teamMembers: ["Mia", "Tom", "Leo", "Tina"],
    startDate: "Feb 15, 2025",
    endDate: "Apr 20, 2025",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 8,
    name: "Project ABC",
    app: ["slack", "github"],
    teamLead: "Kate Morrison",
    teamMembers: ["Ava", "Ryan", "Noah"],
    startDate: "Jan 20, 2025",
    endDate: "Mar 30, 2025",
    status: "Pending",
    progress: 25,
  },
  {
    id: 9,
    name: "Project LMN",
    app: ["github", "firebase", "slack"],
    teamLead: "Kate Morrison",
    teamMembers: ["Fatima", "Sifan", "Adefolayo"],
    startDate: "Jan 10, 2025",
    endDate: "Jun 1, 2025",
    status: "Complete",
    progress: 100,
  },
];

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
};

/* ----------------------------------------------------------------------
   🧱 MAIN PROJECTS PAGE
------------------------------------------------------------------------ */
export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState([{ id: "progress", desc: true }]);
  const columnHelper = createColumnHelper<Project>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Project Name",
        cell: (info) => (
          <Link
            href={`/organization/projects/${info.row.original.id}`}
            className="flex items-center gap-2 text-gray-600"
          >
            {info.getValue()}
          </Link>
        ),
      }),

      columnHelper.accessor("app", {
        header: "App",
        cell: (info) => (
          <div className="flex gap-2 items-center">
            {info.getValue().map((app, i) => (
              <Image
                key={i}
                src={iconMap[app]}
                alt={app}
                width={22}
                height={22}
                className="rounded-full border border-gray-200"
              />
            ))}
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
            <span className="font-medium text-gray-700">{info.getValue()}</span>
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
      columnHelper.accessor("endDate", {
        header: "End Date",
        cell: (info) => (
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

      columnHelper.accessor("progress", {
        header: "Progress",
        cell: (info) => (
          <div className="flex items-center gap-2 w-full min-w-[100px]">
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Projects
        </h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Project
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b bg-gray-100">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-2 text-left font-semibold text-gray-500 cursor-pointer hover:text-blue-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                onClick={() =>
                  (window.location.href = `/organization/projects/${row.original.id}`)
                }
                className="border-t cursor-pointer transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 mt-4 border-t border-gray-200 text-sm">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              projects.length
            )}
          </span>{" "}
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

      {/* Add Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill in the project details below.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="Enter project name"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
