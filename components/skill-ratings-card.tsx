import SkillRate from "./skill-rate";

const SkillRatingsCard = ({
  skillRatingData,
  text = "Skill Ratings",
}: {
  skillRatingData: {
    skill: string;
    skillLevel: number;
    color: string;
  }[];
  text?: string;
}) => {
  return (
    <div className="lg:w-[65%] p-[24px] border rounded-[16px]">
      <p className="font-semibold">{text}</p>
      {/* Skills */}
      <div className="mt-[32px] flex flex-col gap-[20px]">
        {" "}
        {skillRatingData?.map((skill, idx) => (
          <SkillRate
            key={`${skill}_${idx}`}
            skill={skill?.skill}
            skillLevel={skill?.skillLevel}
            color={skill?.color}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillRatingsCard;
