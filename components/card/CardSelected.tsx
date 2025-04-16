import { useTodo } from "@/stores/useTodo";
import { Trash } from "lucide-react";
import React from "react";

interface CardSelectedProps {
  setModalId: (data: string) => void;
}

export default function CardSelected({ setModalId }: CardSelectedProps) {
  const { selectedCategory } = useTodo();

  return (
    <div className="flex flex-row w-full justify-between items-center bg-white shadow-xs rounded-xl p-4 border border-gray-100">
      <div className="">
        <h3 className="text-sm text-gray-500 font-semibold mb-1">
          Selected Category
        </h3>
        <div className="text-lg font-bold text-green-400">
          {selectedCategory?.content || "No category selected"}
        </div>
      </div>
      {selectedCategory?.content !== "" && (
        <div
          onClick={() => setModalId("delete_cat")}
          className=" p-2 bg-red-600 rounded-xl text-white cursor-pointer"
        >
          <Trash size={16} />
        </div>
      )}
    </div>
  );
}
