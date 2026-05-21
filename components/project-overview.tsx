'use client';

import { CreatedProject } from '@/services/hooks/useProjectGet';
import { ComprehensiveProjectData, ProjectTask } from '@/types/projects';
import ProgresWithDate from './progres-with-date';
import IconList from './ui/icon-list';
import LinkedDocs from './linked-docs';
import AiSummary from './ai-summary';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { GitPullRequest, ListTodo, Activity } from 'lucide-react';
import Image from 'next/image';
import { ActivitySection } from './activity-section';
import { TaskCard } from './task-card';
import { Task, TaskStatus } from './types';

interface ProjectOverviewProps {
  project: CreatedProject;
  comprehensiveData?: ComprehensiveProjectData;
}

// Icon mapping for tools
const iconMap: Record<string, string> = {
  // Communication tools
  slack: '/images/slack.png',
  discord: '/images/discord.png',
  teams: '/images/teams.png',
  // Version control
  github: '/images/github.png',
  gitlab: '/images/gitlab.png',
  bitbucket: '/images/bitbucket.png',
  // Project management
  jira: '/images/jira.png',
  asana: '/images/asana.png',
  trello: '/images/trello.png',
  clickup: '/images/clickup.png',
  // Design tools
  figma: '/images/figma.png',
  sketch: '/images/sketch.png',
  // Tech stacks
  nodejs: '/images/nodejs.png',
  react: '/images/react.png',
  python: '/images/python.png',
  javascript: '/images/javascript.png',
  typescript: '/images/typescript.png',
  html: '/images/html.png',
  css: '/images/css.png',
  java: '/images/java.png',
  csharp: '/images/csharp.png',
  php: '/images/php.png',
  ruby: '/images/ruby.png',
  go: '/images/go.png',
  rust: '/images/rust.png',
  swift: '/images/swift.png',
  kotlin: '/images/kotlin.png',
};

const mapProjectTaskToTask = (pt: ProjectTask): Task => ({
  id: pt.id,
  display_task_id: pt.display_task_id,
  status: pt.status as TaskStatus,
  status_color: pt.status_color,
  category_color: pt.category_color,
  title: pt.title,
  description: pt.description,
  file_count: pt.file_count,
  attachment_count: pt.attachment_count,
  message_count: pt.message_count,
  avatars: pt.assignees?.map(a => ({
    src: a?.avatar_url || undefined,
    name: a?.display_name || 'Unknown',
    fallback: a?.display_name?.charAt(0) || 'U',
  })) || [],
});

const ProjectOverview = ({ project, comprehensiveData }: ProjectOverviewProps) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  // Format date range
  const formatDateRange = () => {
    if (!project.start_date || !project.end_date) return 'TBD';
    const startDate = new Date(project.start_date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const endDate = new Date(project.end_date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return `${startDate} - ${endDate}`;
  };

  // Get integrated apps
  const getIntegratedApps = () => {
    if ((project as any).integrated_apps) {
      return (project as any).integrated_apps.map((app: any) => ({
        imgSrc: app.logo_url || iconMap[app.name.toLowerCase()] || '/images/default-app.png',
        stack: app.name,
        isActive: app.is_active,
      }));
    }
    // Fallback for legacy data
    const apps = [];
    if (project.pm_tool) apps.push({ imgSrc: iconMap[project.pm_tool.toLowerCase()] || '/images/default-app.png', stack: project.pm_tool, isActive: true });
    if (project.vc_tool) apps.push({ imgSrc: iconMap[project.vc_tool.toLowerCase()] || '/images/default-app.png', stack: project.vc_tool, isActive: true });
    if (project.comm_tool) apps.push({ imgSrc: iconMap[project.comm_tool.toLowerCase()] || '/images/default-app.png', stack: project.comm_tool, isActive: true });
    return apps;
  };

  const getTechStacks = () => (project.stacks || []).map(stack => ({
    imgSrc: iconMap[stack.toLowerCase()] || '/images/default-stack.png',
    stack: stack,
  }));

  const integratedApps = getIntegratedApps();
  const techStacks = getTechStacks();
  const linkedDocs: string[] = [];

  const activities = comprehensiveData?.activities?.map(act => ({
    user: act.user?.display_name || 'System',
    action: act.content,
    timestamp: act.created_at ? new Date(act.created_at).toLocaleString() : 'Recent', 
    avatar: { 
      src: act.user?.avatar_url || undefined, 
      fallback: act.user?.display_name?.charAt(0) || 'S' 
    }
  })) || [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-10 pl-6">
      {/* Left hand side */}
      <div className="flex w-full flex-col gap-[32px] lg:w-[70%]">
        {isMobile && <AiSummary projectId={project.id} />}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[16px] font-bold">Description</h2>
            {pathname.includes('/organization') && (
              <Button onClick={() => router.push(`/organization/projects/${project.id}/edit`)} className="bg-blue-500 text-white">
                Edit Project
              </Button>
            )}
          </div>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            {project.description || 'No description provided.'}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-[16px] font-bold">Project Timeline</h2>
          <ProgresWithDate
            date={formatDateRange()}
            percentageProgress={project.completion_percentage ?? project.pct_complete}
          />
        </div>

        {/* Tasks Section */}
        {comprehensiveData?.tasks && comprehensiveData.tasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ListTodo size={20} className="text-blue-500" />
              <h2 className="text-[16px] font-bold">Recent Tasks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comprehensiveData.tasks.slice(0, 4).map(task => (
                <TaskCard key={task.id} task={mapProjectTaskToTask(task)} />
              ))}
            </div>
          </div>
        )}

        {/* Pull Requests Section */}
        {comprehensiveData?.pull_requests && comprehensiveData.pull_requests.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GitPullRequest size={20} className="text-purple-500" />
              <h2 className="text-[16px] font-bold">Open Pull Requests</h2>
            </div>
            <div className="space-y-3">
              {comprehensiveData.pull_requests.map(pr => (
                <div key={pr.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{pr.title || 'Untitled PR'}</span>
                    <span className="text-xs text-gray-500">by {pr.author || 'Unknown'} • {pr.created_at ? new Date(pr.created_at).toLocaleDateString() : 'Recent'}</span>
                  </div>
                  {pr.url && (
                    <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">View PR</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities Section */}
        {comprehensiveData?.activities && comprehensiveData.activities.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-green-500" />
              <h2 className="text-[16px] font-bold">Recent Activity</h2>
            </div>
            <ActivitySection activities={activities as any} />
          </div>
        )}

        {techStacks.length > 0 && (
          <div>
            <h2 className="mb-3 text-[16px] font-bold">Required Stacks</h2>
            <IconList data={techStacks} />
          </div>
        )}

        {integratedApps.length > 0 && (
          <div>
            <h2 className="mb-3 text-[16px] font-bold">Integrated Apps</h2>
            <div className="flex flex-wrap gap-4">
              {integratedApps.map((app: any, idx: number) => (
                <div key={idx} className={`flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50/50 ${!app.isActive ? 'grayscale opacity-50' : ''}`}>
                  <Image src={app.imgSrc} alt={app.stack} width={24} height={24} className="object-contain" />
                  <span className="text-sm font-medium text-gray-700">{app.stack}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right hand side */}
      {!isMobile && (
        <div className="flex w-full flex-col gap-[13px] rounded-xl p-6 shadow-[-1px_2px_30px_0px_#0000000D] md:w-[382px] lg:w-[30%] h-fit">
          <div className="flex items-center gap-2">
            <span className="icon-[fluent--sparkle-48-filled] size-5 text-blue-500"></span>
            <h2 className="text-[18px] font-bold">AI Summary</h2>
          </div>
          <AiSummary projectId={project.id} />
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
