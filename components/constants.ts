import type { Task, Column } from "@/components/types";

export const COLUMNS: Column[] = [
  {
    id: "BACKLOG",
    title: "Backlog",
    subTitle: "You can drag task to any category",
    taskCount: 5,
    textColor: "text-[#CA8A04]",
    bgColor: "bg-[#EAB3081A]",
  },
  {
    id: "TODO",
    title: "To Do",
    subTitle: "You can drag task to any category",
    taskCount: 3,
    textColor: "text-[#DB2777]",
    bgColor: "bg-[#EC48991A]",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    subTitle: "You can drag task to any category",
    taskCount: 2,
    textColor: "text-[#9333EA]",
    bgColor: "bg-[#A855F71A]",
  },
  {
    id: "DONE",
    title: "Done",
    subTitle: "You can drag task to any category",
    taskCount: 5,
    textColor: "text-[#16A34A]",
    bgColor: "bg-[#22C55E1A]",
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Modle Answer",
    description: "Gather requirements and create initial documentation",
    status: "BACKLOG",
    status_color: "bg-yellow-100 text-yellow-700",
    display_task_id: "#UI007",
    category: "Design",
    category_color: "bg-green-100 text-green-700",
    priority: "High",
    file_count: 4,
    attachment_count: 2,
    message_count: 3,
    avatars: [
    { src: "https://randomuser.me/api/portraits/men/32.jpg", name : "John Doe", email:"johndoe@gmail.com", alt: "John", fallback: "JD" },
    { src: "https://randomuser.me/api/portraits/women/44.jpg",name : "Jane Doe", email:"janedoe@gmail.com", alt: "Jane", fallback: "JD" },
    { fallback: "+5" } 
  ]
  },
  {
    id: "2",
    title: "Create calendar, chat and email app pages",
    description: "Gather requirements and create initial documentation",
    status: "BACKLOG",
    status_color: "bg-yellow-100 text-yellow-700",
    display_task_id: "#UI003",
    category: "Development",
    category_color: "bg-green-100 text-green-700",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 3,
    avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
]

  },
  {
    id: "3",
    title: "Product Design, Figma, Sketch (Software), Prototype",
    description: "Gather requirements and create initial documentation",
    status: "BACKLOG",
    status_color: "bg-yellow-100 text-yellow-700",
    display_task_id: "#BC05",
    category: "Project",
    category_color: "bg-green-100 text-green-700",
    priority: "High",
    file_count: 2,
    attachment_count: 2,
    message_count: 3,
 avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
]

  },
  {
    id: "4",
    title: "Change email option process",
    description: "Gather requirements and create initial documentation",
    status: "BACKLOG",
    status_color: "bg-yellow-100 text-yellow-700",
    display_task_id: "#FTC07",
    category: "Project",
    category_color: "bg-green-100 text-green-700",
    priority: "High",
    file_count: 2,
    attachment_count: 2,
    message_count: 3,
     avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
  {
    id: "5",
    title: "Model Answer",
    description: "Create component library and design tokens",
    status: "TODO",
    status_color: "bg-[#EC48991A] text-[#DB2777]",
    display_task_id: "#UI005",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },

  {
    id: "6",
    title: "Add authentication pages",
    description: "Create component library and design tokens",
    status: "TODO",
    status_color: "bg-[#EC48991A] text-[#DB2777]",
    display_task_id: "##UI008",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
  {
    id: "7",
    title: "Model Answer",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
    status_color: "bg-[#A855F71A] text-[#9333EA]",
    display_task_id: "#002",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
  {
    id: "8",
    title: "Model Answer",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
    status_color: "bg-[#A855F71A] text-[#9333EA]",
    display_task_id: "#002",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
  {
    id: "9",
    title: "Model Answer",
    description: "Write unit tests for core functionality",
    status: "DONE",
    status_color: "bg-[#22C55E1A] text-[#16A34A]",
    display_task_id: "#UI005",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
  {
    id: "10",
    title: "Create calendar, chat and email app pages",
    description: "Write unit tests for core functionality",
    status: "DONE",
    status_color: "bg-[#22C55E1A] text-[#16A34A]",
    display_task_id: "#UI005",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
  {
    id: "11",
    title: "Product Design, Figma, Sketch (Software), Prototype",
    description: "Write unit tests for core functionality",
    status: "DONE",
    status_color: "bg-[#22C55E1A] text-[#16A34A]",
    display_task_id: "#UI005",
    priority: "High",
    file_count: 1,
    attachment_count: 2,
    message_count: 4,
         avatars: [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", alt: "User 1", fallback: "U1" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User 2", fallback: "U2" },
  { fallback: "+5" }
     ]
  },
];
