import { TaskProps, useTodo } from "@/stores/useTodo";
import React from "react";
import ModalActionTodo from "../modal/ModalActionTodo";
import ModalDeleteTodo from "../modal/ModalDeleteTodo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { ActionDropdown } from "@/utils/action";

interface CardTodoListProps {
  modalId: string;
  data: TaskProps;
  index: number;
  setModalId: (data: string) => void;
}

export default function CardTodoList({
  data,
  modalId,
  index,
  setModalId,
}: CardTodoListProps) {
  const { reqQuery, handlingToggleTask, selectedCategory, setReqQuery } =
    useTodo();

  return (
    <React.Fragment>
      <div className="flex flex-row  justify-between shadow-xs items-center w-full bg-white rounded-md py-3 px-4">
        <div className="flex flex-row w-full items-center gap-4">
          <input
            type="checkbox"
            checked={data?.isdone}
            onChange={() =>
              handlingToggleTask(selectedCategory?.content, index)
            }
            className=" rounded-4xl checked:bg-black"
          />
          <span
            className={`w-full ${
              data?.isdone ? "line-through text-gray-400" : ""
            }`}
          >
            {data?.task}
          </span>
        </div>
        <div className="items-center flex justify-center h-full relative">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-green-300 text-green-600 p-1 rounded-sm ">
                <Menu size={14} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div>
                <div className="bg-green-300 font-medium text-green-700 p-1 text-[11px] w-full">
                  Todo List Action
                </div>
                {ActionDropdown?.length > 0
                  ? ActionDropdown?.map((val, i) => {
                      return (
                        <DropdownMenuItem
                          key={i}
                          onClick={() => {
                            setModalId(val?.value);
                            setReqQuery({ dataValid: data?.task });
                          }}
                        >
                          {val?.label}
                        </DropdownMenuItem>
                      );
                    })
                  : ""}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {modalId === "edit" && reqQuery?.dataValid === data?.task && (
        <ModalActionTodo
          indexData={index}
          mode={modalId}
          edit={true}
          data={data}
          setMode={setModalId}
        />
      )}
      {modalId === "delete" && reqQuery?.dataValid === data?.task && (
        <ModalDeleteTodo
          data={data}
          indexData={index}
          mode={modalId}
          setMode={setModalId}
        />
      )}
    </React.Fragment>
  );
}
