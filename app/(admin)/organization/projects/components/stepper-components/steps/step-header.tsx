const StepHeader = ({
  projectTitle,
  subTitle,
}: {
  projectTitle?: string;
  subTitle?: string;
}) => {
  return (
    <div className="mb-[32px] flex w-full flex-col gap-[13px]">
      {projectTitle && (
        <div className="flex w-fit items-center gap-1">
          <span className="icon-[jam--play] size-5"></span>
          <h1 className="text-[20px] font-semibold">{projectTitle}</h1>
        </div>
      )}
      {subTitle && <p className="max-w-md">{subTitle}</p>}
    </div>
  );
};

export default StepHeader;
