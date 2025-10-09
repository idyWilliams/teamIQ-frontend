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

const dummyGeneration = `This project is a web application designed to streamline team collaboration and enhance productivity. It offers a range of features including task management, real-time chat, file sharing, and project tracking. The application is built using modern web technologies such as React for the frontend and Node.js for the backend. It integrates with popular third-party tools like Slack, GitHub, and Jira to provide a seamless workflow for users. The user interface is intuitive and responsive, ensuring a smooth experience across different devices. Overall, this project aims to improve team communication and project management through an all-in-one platform.`;

const AiSummary = () => {
  const isMobile = useIsMobile();
  const [generated, setGenerated] = useState<boolean>(false);

  return (
    <>
      {isMobile && (
        <Dialog>
          <DialogTrigger
            className="mt-[24px] h-[32px] w-[206px] bg-[#086ACE] cursor-pointer hover:bg-[#086bcedb] text-white rounded-[8px]"
            onClick={() => setGenerated(true)}
          >
            Generate AI Summary
          </DialogTrigger>
          {generated && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center mb-[16px]">
                  <span className="icon-[fluent--sparkle-48-filled] size-5"></span>
                  <span className="font-bold text-[18px]">AI summary</span>
                </DialogTitle>
                <DialogDescription className="bg-[#F3F8FF] overflow-auto overflow-x-hidden p-[12px] text-[13px] text-left max-h-[438px]">
                  {dummyGeneration}
                </DialogDescription>
                <AiSummaryActions />
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>
      )}

      {!isMobile && !generated && (
        <>
          <p className="text-[14px] text-[#626262]">
            Generate summary for your project witth a single click
          </p>
          <Button
            className="h-[32px] w-[206px] bg-[#086ACE] cursor-pointer hover:bg-[#086bcedb] rounded-[8px]"
            onClick={() => setGenerated(true)}
          >
            Generate AI Summary
          </Button>
        </>
      )}

      {!isMobile && generated && (
        <div className="pb-[16px] my-[13px] flex flex-col gap-[13px]">
          <p className="bg-[#F3F8FF] sm:h-[300px] lg:h-fit lg:max-h-[410px] overflow-auto overflow-x-hidden p-[12px] text-[13px] lg:text-[14px]">
            {dummyGeneration}
          </p>
          <AiSummaryActions />
        </div>
      )}
    </>
  );
};

export default AiSummary;
