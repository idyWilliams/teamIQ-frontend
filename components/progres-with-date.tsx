import { cn } from "@/lib/utils";

type progresWithDateProps = {
  date: string;
  percentageProgress?: number;
};

const ProgresWithDate = ({
  date,
  percentageProgress = 0,
}: progresWithDateProps) => {
  return (
    <div className="relative bg-[#F3F8FF] h-[40px] lg:h-[43px] rounded-[12px] flex items-center justify-end pr-[31px] overflow-hidden">
      {/* Progress bar */}
      <div
        className={"bg-[#086ACE] inset-0 absolute"}
        style={{ width: `${percentageProgress}%` }}
      ></div>
      {/* date section */}
      <div
        className={cn(
          "relative z-[2] justify-self-end text-[12px]",
          percentageProgress < 98 ? "text-[#072F57]" : "text-gray-200"
        )}
      >
        {date}
      </div>
    </div>
  );
};

export default ProgresWithDate;
