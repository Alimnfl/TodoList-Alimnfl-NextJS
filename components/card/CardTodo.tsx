import { PlusCircle } from "lucide-react";
import React from "react";

export default function CardTodo() {
  return (
    <div className=" bg-green-400 p-4 rounded-xl text-white flex flex-row gap-3">
      <PlusCircle />
      Create New Task
    </div>
  );
}
