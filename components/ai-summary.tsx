import { useState } from "react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AiSummaryActions from "./ai-summary-actions";
import { useGenerateAiSummary } from "@/services/hooks/useProjectGet";
import { Loader2 } from "lucide-react";

interface AiSummaryProps {
  projectId: string | number;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  // Simple parser for the specific structure requested by the backend agent
  const lines = content.split('\n');
  return (
    <div className="space-y-4 text-left">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return <h3 key={i} className="text-lg font-bold text-blue-700 mt-6 mb-2 border-b border-blue-100 pb-1">{line.replace('## ', '')}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-4 list-disc text-sm text-gray-700 leading-relaxed">{line.replace('- ', '')}</li>;
        }
        if (line.trim() === '') return <div key={i} className="h-2" />;
        return <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>;
      })}
    </div>
  );
};

const AiSummary = ({ projectId }: AiSummaryProps) => {
  const isMobile = useIsMobile();
  const [summary, setSummary] = useState<string>("");
  const { mutate: generate, isPending } = useGenerateAiSummary(projectId);

  const handleGenerate = () => {
    generate(undefined, {
      onSuccess: (data) => {
        setSummary(data);
      },
    });
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-500 font-medium">Analyzing project telemetry...</p>
        </div>
      );
    }

    if (!summary) {
      return (
        <div className="text-center py-8">
          <p className="text-[14px] text-[#626262] mb-4">
            Generate a high-signal summary for your project with a single click.
          </p>
          <Button
            className="h-[40px] px-6 bg-[#086ACE] hover:bg-[#086bcedb] rounded-[12px] font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
            onClick={handleGenerate}
          >
            Generate AI Summary
          </Button>
        </div>
      );
    }

    return <MarkdownRenderer content={summary} />;
  };

  return (
    <>
      {isMobile ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-[24px] h-[40px] w-full bg-[#086ACE] text-white rounded-[12px] font-bold">
              AI Insights
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 mb-4">
                <span className="icon-[fluent--sparkle-48-filled] size-5 text-blue-600"></span>
                <span className="font-bold text-[18px]">Project Intelligence</span>
              </DialogTitle>
              <div className="bg-[#F3F8FF] rounded-xl overflow-auto p-4 text-left max-h-[60vh]">
                {renderContent()}
              </div>
              {summary && <AiSummaryActions />}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex flex-col gap-4">
          <div className={`bg-[#F3F8FF] rounded-2xl p-5 min-h-[100px] transition-all ${summary ? 'ring-1 ring-blue-100' : ''}`}>
            {renderContent()}
          </div>
          {summary && !isPending && <AiSummaryActions />}
        </div>
      )}
    </>
  );
};

export default AiSummary;
