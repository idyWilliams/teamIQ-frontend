"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Calendar, Circle, Plus } from "lucide-react";

/* -----------------------------
   ✅ Image Component (Safe)
------------------------------ */
type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className }) => (
  <div
    style={{
      width: width ? `${width}px` : "100%",
      height: height ? `${height}px` : "100%",
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className={className}
    title={alt}
  />
);

/* -----------------------------
   ✅ Define Project Type
------------------------------ */
type Project = {
  id: number;
  name: string;
  app: string[];
  teamLead: string;
  teamMembers: string[];
  startDate: string;
  endDate: string;
  status: "In Progress" | "Complete" | "Pending";
  progress: number;
};

/* -----------------------------
   ✅ Mock Data
------------------------------ */
const projects: Project[] = [
  {
    id: 1,
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
    id: 2,
    name: "Project XYZ",
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
    name: "Project XYZ",
    app: ["figma", "jira"],
    teamLead: "Kate Morrison",
    teamMembers: ["Ben", "Ella", "Mark", "Zoe"],
    startDate: "Feb 1, 2025",
    endDate: "May 10, 2025",
    status: "In Progress",
    progress: 50,
  },
  {
    id: 4,
    name: "Project XYZ",
    app: ["github", "firebase", "slack"],
    teamLead: "Kate Morrison",
    teamMembers: ["Fatima", "Sifan", "Adefolayo"],
    startDate: "Jan 10, 2025",
    endDate: "Jun 1, 2025",
    status: "Complete",
    progress: 100,
  },
  {
    id: 5,
    name: "Project XYZ",
    app: ["jira", "gitlab"],
    teamLead: "Kate Morrison",
    teamMembers: ["Andrew", "Kabreer", "Suraya"],
    startDate: "Mar 1, 2025",
    endDate: "Jun 15, 2025",
    status: "In Progress",
    progress: 70,
  },
];

/* -----------------------------
   ✅ Icon Map
------------------------------ */
const iconMap: Record<string, string> = {
  slack: "/images/slack.png",
  jira: "/images/jira.png",
  github: "/images/github.png",
  gitlab: "/images/gitlab.png",
  figma: "/images/figma.png",
  firebase: "/images/clickup.png",
};

/* -----------------------------
   ✅ Main Component
------------------------------ */
export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState([{ id: "progress", desc: true }]);

  const columnHelper = createColumnHelper<Project>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Project Name",
        cell: (info) => (
          <span className="font-medium text-gray-800">{info.getValue()}</span>
        ),
      }),

      columnHelper.accessor("app", {
        header: "App",
        cell: (info) => {
          const apps = info.getValue();
          return (
            <div className="flex gap-2 items-center">
              {apps.map((app, i) => (
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
          );
        },
      }),

      columnHelper.accessor("teamLead", {
        header: "Team Lead",
        cell: (info) => (
          <div className="flex items-center gap-3">
            <Image
              src="/images/profile.2.jpg"
              alt="Lead"
              width={32}
              height={32}
              className="rounded-full border border-gray-300 object-cover"
            />
            <span className="text-gray-700 font-medium">{info.getValue()}</span>
          </div>
        ),
      }),

      columnHelper.accessor("teamMembers", {
        header: "Team Members",
        cell: (info) => {
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
                    className={`rounded-full border-2 border-white object-cover ${
                      i === 0 ? "z-10" : "z-0"
                    }`}
                  />
                ))}
              </div>
              {members.length > 2 && (
                <span className="ml-3 text-gray-600 text-xs font-semibold">
                  +{members.length - 2}
                </span>
              )}
            </div>
          );
        },
      }),

      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={14} />
            {info.getValue()}
          </div>
        ),
      }),

      columnHelper.accessor("endDate", {
        header: "End Date",
        cell: (info) => (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={14} />
            {info.getValue()}
          </div>
        ),
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const color =
            status === "Complete"
              ? "text-green-600"
              : status === "In Progress"
              ? "text-blue-600"
              : "text-yellow-600";
          const dotColor =
            status === "Complete"
              ? "green"
              : status === "In Progress"
              ? "blue"
              : "orange";
          return (
            <div className="flex items-center gap-2">
              <Circle size={8} fill={dotColor} />
              <span className={`font-medium ${color}`}>{status}</span>
            </div>
          );
        },
      }),

      columnHelper.accessor("progress", {
        header: "Progress",
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-2 w-full min-w-[120px]">
              <Progress
                value={info.getValue()}
                status={row.status as "In Progress" | "Complete" | "Pending"}
                className="flex-1"
              />
              <span className="text-xs text-gray-500">
                {info.getValue()}%
              </span>
            </div>
          );
        },
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
  });

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Projects</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> New Project
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-left font-semibold text-gray-700 cursor-pointer select-none hover:text-blue-700 transition"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition-all rounded-md"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600">
        <p>Total Projects: {projects.length}</p>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-4">
            This modal is currently blank — form integration will come after backend setup.
          </p>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
