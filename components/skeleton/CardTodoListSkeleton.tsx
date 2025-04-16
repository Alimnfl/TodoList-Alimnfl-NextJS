import React from "react";
import Skeleton from "../ui/skeleton";

export default function CardTodoListSkeleton() {
  return (
    <div className="flex flex-row justify-between shadow-xs items-center w-full bg-white rounded-md py-3 px-4">
      <div className="flex flex-row w-full items-center gap-4">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-full h-4" />
      </div>
      <div className="items-center flex justify-center h-full relative">
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  );
}
