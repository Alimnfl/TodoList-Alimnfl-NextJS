import React from "react";
import Skeleton from "../ui/skeleton";

export default function HeaderContentSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-42 h-4" />
      </div>

      <div className="flex flex-wrap gap-2 my-4 justify-between">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-xl max-h-[120px] p-4 gap-3 flex flex-col w-[calc(50%-0.25rem)] h-full"
          >
            <div className="flex flex-row justify-between">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-10 h-10 rounded-full bg-gray-400" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-3 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
