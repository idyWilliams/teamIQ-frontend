import { Dot } from "lucide-react";

const ProjectStatus = () => {
  return (
    <>
      <div className="mx-4">
        <div className="flex justify-between mb-3">
          <h2 className="text-[#0E0E0E] font-semibold text-1">
            Project Status Summary
          </h2>
          <h2 className="text-[#0E0E0E] font-semibold text-1">
            View Project List
          </h2>
        </div>
        <div>
          {" "}
          <div className="border-l-[#086ACE] border-l-1 border bg-muted/50 rounded-lg px-5 py-3">
            <div className="flex justify-between mb-1 items-center">
              <h3 className="text-[14px] text-[#141414] font-semibold">
                Mobile App v2.0...
              </h3>
              <div className="text-[#8A8CD9] text-[12px] flex items-center justify-center">
                <Dot className="text-[12px]" /> In Progress
              </div>
            </div>
            <p className="text-[#626262] text-[12px]">Next: Beta </p>
            <p className="text-[#626262] text-[12px]">Release - Jun 25</p>
          </div>
        </div>
        <div className="border-l-[#086ACE] border-l-1 border bg-muted/50 rounded-lg px-5 py-3">
          <div className="flex justify-between mb-1 items-center">
            <h3 className="text-[14px] text-[#141414] font-semibold">
              Mobile App v2.0...
            </h3>
            <div className="text-[#8A8CD9] text-[12px] flex items-center justify-center">
              <Dot className="text-[12px]" /> In Progress
            </div>
          </div>
          <p className="text-[#626262] text-[12px]">Next: Beta </p>
          <p className="text-[#626262] text-[12px]">Release - Jun 25</p>
        </div>
        <div className="border-l-[#086ACE] border-l-1 border bg-muted/50 rounded-lg px-5 py-3">
          <div className="flex justify-between mb-1 items-center">
            <h3 className="text-[14px] text-[#141414] font-semibold">
              Mobile App v2.0...
            </h3>
            <div className="text-[#8A8CD9] text-[12px] flex items-center justify-center">
              <Dot className="text-[12px]" /> In Progress
            </div>
          </div>
          <p className="text-[#626262] text-[12px]">Next: Beta </p>
          <p className="text-[#626262] text-[12px]">Release - Jun 25</p>
        </div>
        <div className="border-l-[#086ACE] border-l-1 border bg-muted/50 rounded-lg px-5 py-3">
          <div className="flex justify-between mb-1 items-center">
            <h3 className="text-[14px] text-[#141414] font-semibold">
              Mobile App v2.0...
            </h3>
            <div className="text-[#8A8CD9] text-[12px] flex items-center justify-center">
              <Dot className="text-[12px]" /> In Progress
            </div>
          </div>
          <p className="text-[#626262] text-[12px]">Next: Beta </p>
          <p className="text-[#626262] text-[12px]">Release - Jun 25</p>
        </div>
      </div>
    </>
  );
};

export default ProjectStatus;
