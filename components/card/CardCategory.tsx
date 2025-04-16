import { TasksProps, useTodo } from "@/stores/useTodo";
import { Notebook, Plus } from "lucide-react";
import React from "react";

export default function CardCategory({
  create,
  data,
  toggleSidebar,
}: {
  create: boolean;
  data: TasksProps | null;
  toggleSidebar: ((data: boolean) => void) | null;
}) {
  const { setSelectedCategory } = useTodo();

  if (create) {
    return (
      <div className="flex flex-row gap-6 rounded-xl p-3 text-green-600 bg-green-100 hover:bg-green-200 cursor-pointer">
        <Plus className="w-6 h-6 p-1 rounded-xl bg-green-600 text-white" />
        <div className="">Create new category</div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        setSelectedCategory({ content: data?.category });
        if (typeof toggleSidebar === "function") {
          toggleSidebar(false);
        }
      }}
      className="flex cursor-pointer flex-row px-3 py-2 hover:border border-green-200 shadow-sm hover:border-green-200 justify-between rounded-xl items-center"
    >
      <div className="flex flex-row gap-4 items-center">
        <div className="bg-green-400 text-white p-2 rounded-full">
          <Notebook size={20} />
        </div>
        <h3 className="font-medium text-green-500">{data?.category}</h3>
      </div>
      <span className="p-2 px-3 rounded-xl bg-green-300 text-green-600">
        {data?.items?.length}
      </span>
    </div>
  );
}
