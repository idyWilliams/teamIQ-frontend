"use client";
import CardItemSkt from "./cardItemSkt";
import DeadlineSkt from "./deadline-skt";
import RadarSkt from "./radar-skt";
import RadialSkt from "./radial-skt";
import RecentSkt from "./recent-skt";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonPage() {
  return (
    <div className="px-6">
      <Skeleton className="h-5 sm:w-1/5 mt-5 mb-9 max-sm:w-3/4"></Skeleton>
      {/* desktop skeleton display */}
      <div className="hidden sm:flex gap-4 mb-12 max-lg:flex-wrap ">
        {"abcde".split("").map((i) => (
          <CardItemSkt key={i} />
        ))}
      </div>


       {/* card skeleton for mobile */}
            <div className="mb-8 sm:hidden">
              <div
                
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
              >
                {"abcde".split("").map((i) => (
                  <div key={i} className="snap-center shrink-0 w-full">
                    <CardItemSkt key={i}  />
                  </div>
                ))}
              </div>
      {/* indicator button skeleton */}
              <div className="flex gap-2 justify-center mt-4">
                  <Skeleton className={`w-1/4 h-3 rounded-full `}/>
              </div>
            </div>

             <div className="flex gap-6 items-stretch max-sm:flex-col mb-12">
                    <div className="lg:flex-2/3 flex-1 ">
                      <RadarSkt />
                    </div>
                    <div className="lg:flex-1/3 flex-1">
                    <RadialSkt />
                    </div>
                  </div>
                  <div>
                          <div className="flex gap-6 items-stretch max-sm:flex-col mb-12">
                            <div className="lg:flex-2/3 flex-1 ">
                              <RecentSkt />
                            </div>
                            <div className="lg:flex-1/3 flex-1">
                             <DeadlineSkt></DeadlineSkt>
                            </div>
                          </div>
                        </div>
    </div>
  );
}
