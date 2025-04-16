import React from "react";
import Skeleton from "../ui/skeleton";

export default function CardCategorySkeleton({ create }: { create: boolean }) {
  if (create) {
    return (
      <div className="flex flex-row items-center gap-6 rounded-xl p-3 text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer">
        <Skeleton className="w-6 h-6 rounded-xl bg-gray-600" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }
  return (
    <div className="flex cursor-pointer flex-row px-3 py-2 hover:border border-gray-200 shadow-sm hover:border-gray-200 justify-between rounded-xl items-center">
      <div className="flex flex-row gap-4 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-16 rounded-xl" />
    </div>
  );
}
