import { Dot } from "lucide-react";

const Datas = [
  {
    name: "Mobile App v2.0...",
    status: "In Progress",
    description: "Next: Beta",
    Date: "Release - Jun 25",
  },
  {
    name: "API Modernization...",
    status: "In Progress",
    description: "Next: Security",
    Date: "Review - Jul 20",
  },
  {
    name: "API Modernization...",
    status: "In Progress",
    description: "Next: Security",
    Date: "Review - Jul 20",
  },
  {
    name: "Customer Portal...",
    status: "In Progress",
    description: "Next: Phase 2",
    Date: "Start - Jul 30",
  },
];

const ProjectStatus = () => {
  return (
    <>
      <div className="mx-4 w-full">
        <div className="flex justify-between mb-3">
          <h2 className="text-[#0E0E0E] font-semibold text-1">
            Project Status Summary
          </h2>
          <h2 className="text-[#0E0E0E] font-semibold text-1">
            View Project List
          </h2>
        </div>

        <div className="flex gap-4 flex-col">
          {Datas.map((data, index) => (
            <div
              key={index}
              className="border-l-[#086ACE] border-l-1 border bg-muted/50 rounded-lg px-5 py-3">
              <div className="flex justify-between mb-1 items-center">
                <h3 className="text-[14px] text-[#141414] font-semibold">
                  {data.name}
                </h3>
                <div className="text-[#8A8CD9] text-[12px] flex items-center justify-center">
                  <Dot className="text-[12px]" /> <span>{data.status}</span>
                </div>
              </div>
              <p className="text-[#626262] text-[12px]">{data.description}</p>
              <p className="text-[#626262] text-[12px]">{data.Date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectStatus;
