const SkillRate = ({
  skill,
  skillLevel = 0,
  color = '#F7F7F7',
}: {
  skill: string;
  skillLevel: number;
  color: string;
}) => {
  return (
    <div className="relative flex h-[40px] items-center justify-end overflow-clip rounded-[8px] bg-[#F7F7F7] px-[24px] lg:h-[49px]">
      <div
        className={
          'absolute top-0 bottom-0 left-[-1px] flex -translate-x-[2%]  -skew-x-[20deg] items-center justify-center overflow-clip rounded-tr-md rounded-br-md font-bold text-white lg:text-[14px]'
        }
        style={{
          width: `${skillLevel + 5}%`,
          backgroundColor: `${color}`,
        }}
      >
        {skillLevel}%
        
      </div>
      <span className="relative z-10 text-[13px] font-semibold lg:text-[14px]">
        {skill}
      </span>
    </div>
  );
};

export default SkillRate;
