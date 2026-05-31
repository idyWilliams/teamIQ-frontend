'use client';

import { useProjectCreation } from '@/context/ProjectCreationContext';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextArea } from '../ui/FormTextArea';
import { Layout, FileText, Info, Upload, X, File, Image as ImageIcon, Check, Zap, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState, useRef } from 'react';
import axiosInstance from '@/services/axios';
import { Badge } from '@/components/ui/badge';
import { useIntegrations } from '@/context/IntegrationContext';
import { apps } from '@/components/apps/appCards';
import { AppDetailModal } from '@/components/marketPlace/AppDetailModal';
import { useAuthStore } from '@/store/useAuthStore';
import { Apps } from '@/types/integrations';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const PROJECT_TYPES = [
  { id: 'software_development', label: 'Software Development', description: 'Apps, Websites, Backend' },
  { id: 'business_management', label: 'Business Management', description: 'Operations, HR, Finance' },
  { id: 'strategy_consulting', label: 'Strategy & Consulting', description: 'Advisory, Client Strategy' },
  { id: 'marketing_creative', label: 'Marketing & Creative', description: 'Campaigns, Branding, Design' },
  { id: 'research_development', label: 'Research & Development', description: 'R&D, Data Science' },
  { id: 'other', label: 'Other', description: 'General Projects' },
];

const METHODOLOGIES = ['Agile', 'Scrum', 'Waterfall', 'Lean', 'Kanban'];
const TECH_STACK_OPTIONS = ['React', 'Next.js', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'TypeScript'];

const SUGGESTIONS_MAP: Record<string, string[]> = {
  software_development: ['github', 'jira', 'slack', 'linear'],
  business_management: ['clickup', 'asana', 'slack', 'notion'],
  strategy_consulting: ['notion', 'slack', 'teams'],
  marketing_creative: ['figma', 'slack', 'clickup', 'asana'],
  research_development: ['github', 'notion', 'slack', 'teams'],
  other: ['slack', 'trello'],
};

export function Step1ProjectDetails() {
  const {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    projectType,
    setProjectType,
    industry,
    setIndustry,
    methodology,
    setMethodology,
    projectImage,
    setProjectImage,
    linkedDocuments,
    addDocument,
    removeDocument,
    techStacks,
    setTechStacks,
    validationErrors,
  } = useProjectCreation();

  const { connections } = useIntegrations();
  const organizationId = useAuthStore(state => state.user?.id?.toString() || '');
  
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Apps | null>(null);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const nameError = validationErrors.find(e => e.includes('Project name'));

  const suggestedApps = (SUGGESTIONS_MAP[projectType] || [])
    .map(id => apps.find(a => a.id === id))
    .filter(Boolean) as any[];

  const isConnected = (appId: string) => connections.some(c => c.provider === appId);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/api/v1/upload/image?image_type=project', formData);
      setProjectImage(response.data.url);
    } catch (err) {
      console.error('Image upload failed', err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingDoc(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/api/v1/upload/document', formData);
        addDocument({
          name: file.name,
          url: response.data.url,
          type: file.type,
          size: file.size,
        });
      }
    } catch (err) {
      console.error('Document upload failed', err);
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const toggleTechStack = (stack: string) => {
    if (techStacks.includes(stack)) {
      setTechStacks(techStacks.filter(s => s !== stack));
    } else {
      setTechStacks([...techStacks, stack]);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
      <div className="xl:col-span-7 space-y-12">
        {/* Basic Info Group */}
        <div className="space-y-8">
          <div className="space-y-6">
            <FormInput
              label={<span>Project Name <span className="text-red-500">*</span></span> as any}
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="e.g., Mobile App Redesign"
              required
              maxLength={100}
              error={nameError}
              className="text-lg font-semibold h-14 w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  Project Type <span className="text-red-500">*</span>
                </Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="h-14 w-full bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map(type => (
                      <SelectItem key={type.id} value={type.id} className="py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-sm text-gray-900">{type.label}</span>
                          <span className="text-[10px] text-gray-500 leading-tight">{type.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  Methodology <span className="text-red-500">*</span>
                </Label>
                <Select value={methodology} onValueChange={setMethodology}>
                  <SelectTrigger className="h-14 w-full bg-white border-gray-200 focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <SelectValue placeholder="Select methodology" />
                  </SelectTrigger>
                  <SelectContent>
                    {METHODOLOGIES.map(m => (
                      <SelectItem key={m} value={m} className="py-3 font-medium text-sm text-gray-900">{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(projectType === 'business_management' || projectType === 'strategy_consulting' || projectType === 'research_development') && (
                <div className="md:col-span-2 space-y-2.5">
                  <FormInput
                    label="Industry"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    placeholder="e.g., Fintech, Healthcare, E-commerce"
                    className="h-14 w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Smart Suggestions */}
          {suggestedApps.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50/50 to-white border border-blue-100 rounded-2xl p-6 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500 fill-blue-500" />
                    Recommended Stack
                  </h4>
                  <p className="text-[11px] text-blue-600">Tailored for {PROJECT_TYPES.find(t => t.id === projectType)?.label} workflows</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {suggestedApps.map(app => (
                  <div 
                    key={app.id} 
                    className={`bg-white border rounded-xl p-4 flex items-center justify-between group transition-all ${
                      isConnected(app.id) ? 'border-green-100 bg-green-50/20' : 'hover:border-blue-300 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => !isConnected(app.id) && setSelectedApp(app)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 relative flex-shrink-0">
                        {typeof app.logo === 'string' ? (
                          <span className="text-2xl flex items-center justify-center h-full w-full">{app.logo}</span>
                        ) : (
                          <Image src={app.logo} alt={app.name} fill className="object-contain" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{app.name}</p>
                        <p className="text-[10px] text-gray-500 truncate capitalize">{app.category}</p>
                      </div>
                    </div>
                    {isConnected(app.id) ? (
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                    ) : (
                      <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-blue-100/50">
                <p className="text-[10px] text-gray-400 italic">Centralize data and unlock productivity insights.</p>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">View Integrations</button>
              </div>
            </div>
          )}

          <FormTextArea
            label="Project Description"
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            placeholder="What are the goals of this project?"
            rows={5}
            maxLength={500}
            className="resize-none"
          />

          {projectType === 'software_development' && (
            <div className="space-y-3 pt-2">
              <Label className="text-gray-700">Tech Stacks</Label>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK_OPTIONS.map(stack => (
                  <Badge
                    key={stack}
                    variant={techStacks.includes(stack) ? 'default' : 'outline'}
                    className={`cursor-pointer py-1.5 px-4 rounded-lg transition-all ${
                      techStacks.includes(stack) 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => toggleTechStack(stack)}
                  >
                    {stack}
                    {techStacks.includes(stack) && <Check className="ml-2 h-3.5 w-3.5" />}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Uploaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <Label className="text-gray-700">Project Image</Label>
            <div 
              onClick={() => imageInputRef.current?.click()}
              className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors bg-white group h-40"
            >
              <input 
                type="file" 
                ref={imageInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              {projectImage ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden border group">
                  <img src={projectImage} alt="Project Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-bold">Change Image</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setProjectImage(''); }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    {isUploadingImage ? <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <ImageIcon className="h-6 w-6" />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">Upload cover</p>
                    <p className="text-[10px] text-gray-500">Max. 5MB</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700">Project Documents</Label>
            <div 
              onClick={() => docInputRef.current?.click()}
              className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors bg-white group h-40"
            >
              <input 
                type="file" 
                ref={docInputRef} 
                onChange={handleDocUpload} 
                className="hidden" 
                multiple
              />
              <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                {isUploadingDoc ? <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Upload className="h-6 w-6" />}
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Attach documents</p>
                <p className="text-[10px] text-gray-500">PDF, DOCX, XLSX</p>
              </div>
            </div>
          </div>
        </div>

        {linkedDocuments.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {linkedDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white border rounded-xl group hover:border-blue-200 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <File className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate text-gray-900">{doc.name}</p>
                  <p className="text-[10px] text-gray-500">{(doc.size / 1024).toFixed(1)} KB</p>
                </div>
                <button 
                  onClick={() => removeDocument(doc.url)}
                  className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Card */}
      <div className="xl:col-span-5 sticky top-8">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">Real-time Preview</h3>
        <div className="bg-white border rounded-[2.5rem] shadow-xl overflow-hidden ring-[12px] ring-gray-100/50">
          <div className="h-48 relative bg-gray-100">
            {projectImage ? (
              <img src={projectImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-600 to-indigo-800 p-8 flex items-end">
                <div className="h-16 w-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
                  <Layout className="h-8 w-8" />
                </div>
              </div>
            )}
            <div className="absolute top-6 right-6">
              <Badge className="bg-white/95 backdrop-blur text-blue-700 shadow-xl border-0 py-1.5 px-4 font-bold text-[11px] uppercase tracking-wider">
                {PROJECT_TYPES.find(t => t.id === projectType)?.label || 'Project'}
              </Badge>
            </div>
          </div>
          <div className="p-10 space-y-8">
            <div className="space-y-3">
              <div className={`transition-all ${projectName ? 'mb-2' : 'h-8 w-3/4 bg-gray-100 rounded-lg animate-pulse'}`}>
                {projectName && <h4 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">{projectName}</h4>}
              </div>
              <div className={`transition-all ${projectDescription ? '' : 'h-4 w-full bg-gray-50 rounded animate-pulse'}`}>
                {projectDescription && <p className="text-sm text-gray-500 line-clamp-4 leading-relaxed">{projectDescription}</p>}
              </div>
            </div>

            {(industry || methodology || techStacks.length > 0) && (
              <div className="flex flex-wrap gap-2.5 pt-4">
                {industry && <Badge variant="outline" className="text-[11px] py-1 px-3 border-gray-200">{industry}</Badge>}
                {methodology && <Badge variant="outline" className="text-[11px] py-1 px-3 border-blue-100 bg-blue-50/50 text-blue-700">{methodology}</Badge>}
                {techStacks.slice(0, 4).map(s => <Badge key={s} className="text-[11px] py-1 px-3 bg-gray-900 text-white border-0">{s}</Badge>)}
              </div>
            )}
            
            <div className="pt-8 border-t flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                      ?
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Team</p>
                  <p className="text-[10px] text-gray-400">Assign later</p>
                </div>
              </div>
              {linkedDocuments.length > 0 && (
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[11px] font-bold">
                  <FileText className="h-3.5 w-3.5" />
                  {linkedDocuments.length} Documents
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-600/5 border border-blue-600/10 rounded-2xl p-6 flex gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
            <Info className="h-5 w-5 text-white" />
          </div>
          <div className="text-sm leading-relaxed text-blue-900">
            <p className="font-bold text-blue-950 mb-1">Intelligent Setup</p>
            <p>We&apos;re tailoring your workspace with <b>{PROJECT_TYPES.find(t => t.id === projectType)?.label}</b> defaults to jumpstart your workflow.</p>
          </div>
        </div>
      </div>

      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          organizationId={organizationId}
        />
      )}
    </div>
  );
}
