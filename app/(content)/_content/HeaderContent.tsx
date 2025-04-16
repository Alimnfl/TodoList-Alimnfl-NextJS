"use client";

import HeaderContentSkeleton from "@/components/skeleton/HeaderContentSkeleton";
import { useData } from "@/utils/data";
import React, { useEffect, useState } from "react";

export default function HeaderContent() {
  const { SummaryData, formattedDate, greeting } = useData();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HeaderContentSkeleton />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full relative">
        <h2 className="font-semibold text-3xl">{greeting}!</h2>
        <p className="text-gray-500">Today, {formattedDate}</p>
      </div>
      <div className="grid grid-cols-2 pt-10 w-full gap-2">
        {SummaryData?.map((data, index) => (
          <div
            key={index}
            className={`bg-white shadow-xs rounded-xl  max-h-[120px] p-4 gap-3 flex flex-col w-full h-full`}
          >
            <div className="flex flex-row justify-between">
              <span className="flex flex-row items-center gap-1">
                <span className="text-2xl font-medium">{data?.title}</span>
              </span>
              <div className="bg-green-500 text-white rounded-full p-2">
                {data?.icon}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{data?.subTitle}</span>
              <span className="text-xs text-gray-400">{data?.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
