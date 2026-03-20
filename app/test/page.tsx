'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import { projects } from '@/services/api';
// import { useInviteUser } from '@/services/hooks/useInviteUser';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';

export default function TestPage() {
  useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get(projects.list);
      return res.data;
    },
  });

  // if (isLoading) return <p>Loading projects...</p>;
  // if (isError) return <p>Error fetching projects.</p>;

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-bold mb-2">Projects</h1>
      <ul>
        {data?.slice(0, 5).map((project: any) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul> */}

      <Tabs defaultValue="details">
        <TabsList>
          {info.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-red-300 data-[state=active]:bg-amber-400"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {info.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="bg-red-400">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

const info = [
  {
    label: 'Details',
    value: 'details',
    content: (
      <>
        <h1>Details</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          velit accusantium commodi quos necessitatibus, non sunt, corrupti nisi
          quia tempore veritatis sint quam cupiditate voluptatum. Libero illo
          voluptatum voluptate quos.
        </p>
      </>
    ),
  },
  {
    label: 'Team',
    value: 'team',
    content: (
      <>
        <h1>Team</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          velit accusantium commodi quos necessitatibus, non sunt, corrupti nisi
          quia tempore veritatis sint quam cupiditate voluptatum. Libero illo
          voluptatum voluptate quos.
        </p>
      </>
    ),
  },
  {
    label: 'Settings',
    value: 'settings',
    content: (
      <>
        <h1>Settings</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          velit accusantium commodi quos necessitatibus, non sunt, corrupti nisi
          quia tempore veritatis sint quam cupiditate voluptatum. Libero illo
          voluptatum voluptate quos.
        </p>
      </>
    ),
  },
];
