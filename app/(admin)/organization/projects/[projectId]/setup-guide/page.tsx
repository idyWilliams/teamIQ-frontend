'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWebhookInstructions } from '@/services/hooks/useProjectGet';
import { Loader, AlertCircle, CheckCircle2, Copy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function WebhookSetupPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  const { data: instructions, isLoading, error } = useWebhookInstructions(projectId);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Preparing your setup guide...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Failed to load instructions</h1>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Button onClick={() => router.push('/organization/projects')} className="w-full">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Created Successfully!</h1>
        <p className="text-gray-500">Follow the steps below to complete your integration setup.</p>
      </div>

      <div className="space-y-8">
        {instructions?.steps.map((step) => (
          <div key={step.step_number} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center bg-blue-600 text-white rounded-full text-sm">
                  {step.step_number}
                </span>
                Step {step.step_number}
              </h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">{step.instruction}</p>
              
              {step.webhook_url && (
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Payload URL</label>
                  <div className="flex gap-2">
                    <code className="flex-1 p-3 bg-gray-100 rounded-lg text-sm font-mono text-blue-700 break-all">
                      {step.webhook_url}
                    </code>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => copyToClipboard(step.webhook_url!, 'Webhook URL')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {step.event_checkboxes && step.event_checkboxes.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Events to Select</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.event_checkboxes.map((event, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button 
          size="lg" 
          onClick={() => router.push(`/organization/projects/${projectId}`)}
          className="bg-blue-600 hover:bg-blue-700 gap-2 px-12 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-blue-200"
        >
          Finish Setup & View Dashboard
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
