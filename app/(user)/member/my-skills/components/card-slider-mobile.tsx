import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type CardItem = {
  text: string;
  icon: string;
};
type cardValue = {
  value: string | number;
  isPercent: boolean;
};

type CardSliderProps = {
  cardItems: CardItem[];
  cardValues: cardValue[];
};

const CardSliderMobile = ({ cardItems, cardValues }: CardSliderProps) => {
  // for mobile carousel
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const cardWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {cardItems.map((cardItem, idx) => (
          <div
            key={idx}
            className="snap-center shrink-0 w-full border min-w-[200px] rounded-[16px] p-[24px] h-[120px]"
          >
            <div className="flex justify-between items-center mb-[8px]">
              <h3 className="font-semibold">{cardItem?.text}</h3>
              <span
                className={cn(cardItem.icon, "size-5 text-[#086ACE]")}
              ></span>
            </div>
            <div className="font-bold text-xl">
              {cardValues?.at(idx)?.value}
              {cardValues?.at(idx)?.isPercent && "%"}
            </div>
          </div>
        ))}
      </div>
      {/* indicator button container */}
      <div className="flex gap-2 justify-center mt-4">
        {cardItems.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>{" "}
    </>
  );
};

export default CardSliderMobile;
