import Image from "next/image";

type IconListProps = {
  imgSrc: string;
  stack: string;
};

const IconList = ({ data }: { data: IconListProps[] }) => {
  return (
    <div className="flex gap-[10px]">
      {data?.map((item, index) => (
        <div
          key={`${item?.stack}_${index}`}
          className="w-[57px] h-[69px] lg:h-[73px] flex items-center flex-col justify-center"
        >
          <Image
            src={item?.imgSrc}
            width={53}
            height={48}
            alt={`${item?.stack} image`}
          />
          <span className="text-[10px] text-[#626262] font-[500]">
            {item?.stack}
          </span>
        </div>
      ))}
    </div>
  );
};

export default IconList;
