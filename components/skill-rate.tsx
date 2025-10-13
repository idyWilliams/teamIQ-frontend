const SkillRate = ({
  skill,
  skillLevel = 0,
  color = "#F7F7F7",
}: {
  skill: string;
  skillLevel: number;
  color: string;
}) => {
  return (
    <div className="relative flex justify-end items-center bg-[#F7F7F7] rounded-[8px] h-[40px] lg:h-[49px] overflow-clip px-[24px]">
      <div
        className={
          "absolute left-[-1px] top-0 bottom-0 flex items-center justify-center text-white lg:text-[14px] font-bold"
        }
        style={{
          clipPath: `polygon(0 0, 100% 0, ${
            skillLevel < 100 ? 90 : 100
          }% 100%, 0 100%)`,
          width: `${skillLevel}%`,
          backgroundColor: `${color}`,
        }}
      >
        {skillLevel}%
      </div>
      <span className="font-semibold text-[13px] lg:text-[14px] relative z-10">
        {skill}
      </span>
    </div>
  );
};

export default SkillRate;
