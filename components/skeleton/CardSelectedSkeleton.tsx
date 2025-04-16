import React from "react";

export default function CardSelectedSkeleton() {
  return (
    <div className="flex flex-row w-full justify-between items-center bg-white shadow-xs rounded-xl p-4 border border-gray-100 animate-pulse">
      <div className="">
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
      </div>
      <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
    </div>
  );
}
