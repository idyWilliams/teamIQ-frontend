// components/ProjectCard.tsx
import Image from 'next/image';

export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className={`h-24 flex items-center justify-center`} style={{ backgroundColor: project.bg }}>
        <Image
          src={project.logo}
          alt={project.name}
          width={80}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{project.name}</h3>
        <p className="text-sm text-gray-500">{project.description}</p>
        <div className="flex items-center mt-3">
          <div className="flex -space-x-2">
            {project.avatars.map((member: string, index: number) => (
              <Image
                key={index}
                src={member}
                alt=""
                width={24}
                height={24}
                className="rounded-full border-2 border-white"
              />
            ))}
          </div>
          <span className="text-xs ml-2 text-gray-600">
            +{project.extra}
          </span>
        </div>
      </div>
    </div>
  );
}
