'use client';

import { useProjectCreation } from '@/context/ProjectCreationContext';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextArea } from '../ui/FormTextArea';
import { Layout, FileText, Info, Upload, X, File, Image as ImageIcon, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import axiosInstance from '@/services/axios';
import { Badge } from '@/components/ui/badge';

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

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const nameError = validationErrors.find(e => e.includes('Project name'));

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <FormInput
            label="Project Name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="e.g., Mobile App Redesign"
            required
            maxLength={100}
            error={nameError}
            className="text-lg font-semibold"
          />

          <div className="space-y-2">
            <Label>Project Type</Label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-[10px] text-gray-500">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormTextArea
            label="Project Description"
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            placeholder="What are the goals of this project?"
            rows={4}
            maxLength={500}
          />

          {/* Conditional Fields */}
          <div className="grid grid-cols-2 gap-4">
            {(projectType === 'business_management' || projectType === 'strategy_consulting' || projectType === 'research_development') && (
              <div className="space-y-2">
                <Label>Industry</Label>
                <FormInput
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  placeholder="e.g., Fintech"
                />
              </div>
            )}

            {(projectType === 'software_development' || projectType === 'business_management') && (
              <div className="space-y-2">
                <Label>Methodology</Label>
                <Select value={methodology} onValueChange={setMethodology}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select methodology" />
                  </SelectTrigger>
                  <SelectContent>
                    {METHODOLOGIES.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {projectType === 'software_development' && (
            <div className="space-y-2">
              <Label>Tech Stacks</Label>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK_OPTIONS.map(stack => (
                  <Badge
                    key={stack}
                    variant={techStacks.includes(stack) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTechStack(stack)}
                  >
                    {stack}
                    {techStacks.includes(stack) && <Check className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Uploaders */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Project Image</Label>
            <div 
              onClick={() => imageInputRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors bg-white group"
            >
              <input 
                type="file" 
                ref={imageInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              {projectImage ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <img src={projectImage} alt="Project Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setProjectImage(''); }}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    {isUploadingImage ? <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <ImageIcon className="h-5 w-5" />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">Click to upload project cover</p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Documents</Label>
            <div 
              onClick={() => docInputRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors bg-white group"
            >
              <input 
                type="file" 
                ref={docInputRef} 
                onChange={handleDocUpload} 
                className="hidden" 
                multiple
              />
              <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                {isUploadingDoc ? <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Upload className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Upload documentation</p>
                <p className="text-xs text-gray-500">PDF, DOCX, XLSX (max. 10MB)</p>
              </div>
            </div>

            {linkedDocuments.length > 0 && (
              <div className="space-y-2">
                {linkedDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white border rounded-lg group">
                    <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                      <File className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{doc.name}</p>
                      <p className="text-[10px] text-gray-400">{(doc.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button 
                      onClick={() => removeDocument(doc.url)}
                      className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="hidden md:block sticky top-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</h3>
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden ring-4 ring-gray-50">
          <div className="h-32 relative bg-gray-100">
            {projectImage ? (
              <img src={projectImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-700 p-6 flex items-end">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 flex items-center justify-center text-white">
                  <Layout className="h-6 w-6" />
                </div>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur shadow-sm">
                {PROJECT_TYPES.find(t => t.id === projectType)?.label || 'Project'}
              </Badge>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className={`transition-all ${projectName ? 'mb-1' : 'h-6 w-3/4 bg-gray-100 rounded mb-2'}`}>
                {projectName && <h4 className="text-xl font-bold text-gray-900 leading-tight">{projectName}</h4>}
              </div>
              <div className={`transition-all ${projectDescription ? '' : 'h-3 w-full bg-gray-50 rounded'}`}>
                {projectDescription && <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{projectDescription}</p>}
              </div>
            </div>

            {(industry || methodology || techStacks.length > 0) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {industry && <Badge variant="outline" className="text-[10px]">{industry}</Badge>}
                {methodology && <Badge variant="outline" className="text-[10px]">{methodology}</Badge>}
                {techStacks.slice(0, 3).map(s => <Badge key={s} className="text-[10px]">{s}</Badge>)}
              </div>
            )}
            
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-400">
                      ?
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">No members yet</div>
              </div>
              {linkedDocuments.length > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-blue-600 font-medium">
                  <FileText className="h-3 w-3" />
                  {linkedDocuments.length} Docs
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-700 leading-relaxed">
            <p className="font-bold mb-1">Adaptive Setup</p>
            <p>Your workspace is being customized based on your <b>{PROJECT_TYPES.find(t => t.id === projectType)?.label}</b> selection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
