import { cn } from "@/lib/utils";

const SkillRecommendationCard = ({
  skillData,
}: {
  skillData: {
    skill: string;
    skillLevel: number;
    skillClass: string;
    description: string[];
  };
}) => {
  return (
    <div className="rounded-[8px] flex flex-col gap-[4px] border-l-2 border-[#086ACE] relative bg-[#F7F7F7] py-[12px] px-[25px]">
      <h3 className="font-semibold text-[14px]">{skillData?.skill}</h3>
      <p className="text-[12px] text-[#626262]">
        Skill level: {skillData?.skillLevel}%
      </p>
      <div
        className={cn(
          skillData?.skillClass?.toLowerCase() === "high"
            ? "bg-[#FFE7E3] text-iq-err-300"
            : skillData?.skillClass?.toLowerCase() === "medium"
            ? "bg-iq-war-100 text-iq-war-300"
            : "bg-[#E3F9E3] text-green-700",
          "absolute top-[12px] right-[25px] text-[12px] font-[600] py-[4px] px-[1rem] rounded-[40px]"
        )}
      >
        {skillData?.skillClass}
      </div>
      <ul className="text-[13px] list-disk">
        {skillData?.description?.map((desc, idx) => (
          <li key={idx}>{desc}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillRecommendationCard;
