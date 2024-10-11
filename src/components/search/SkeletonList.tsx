import { Skeleton } from "../ui/Skeleton";

const AMOUNT_ITEMS = 10;

export const SkeletonList = () => {
  return (
    <div className="flex flex-col gap-3 mt-16">
      {new Array(AMOUNT_ITEMS).fill(null).map((_, index) => (
        <div key={index} className="bg-secondary rounded-xl py-3 px-5">
          <div className="text-lg">
            <a href="#" className="text-link">
              <Skeleton key={index} className="w-[360px] h-[21px]" />
            </a>
          </div>
          <div className="text-sm mt-1">
            <Skeleton key={index} className="w-full h-[21px]" />
          </div>
          <div className="text-sm mt-1.5 flex">
            <Skeleton key={index} className="w-20 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
};
