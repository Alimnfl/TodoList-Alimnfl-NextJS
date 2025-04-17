import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { TaskProps, useTodo } from "@/stores/useTodo";
import { Button } from "../ui/button";
import CardTodo from "../card/CardTodo";

interface ModalActionTodoProps {
  mode: string;
  setMode: (data: string) => void;
  edit: boolean;
  data: TaskProps | null;
  indexData: number;
}

export default function ModalActionTodo({
  mode,
  setMode,
  edit,
  data,
  indexData,
}: ModalActionTodoProps) {
  const {
    reqQuery,
    setReqQuery,
    selectedCategory,
    handlingEditTask,
    handlingAddTask,
  } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (edit && mode === "edit") {
      setModalOpen(true);
      setReqQuery({ item: data?.task });
    }
  }, [edit, mode]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReqQuery({ [name]: value });
  };

  const handlingPostTodo = () => {
    if (edit) {
      handlingEditTask(selectedCategory?.content, indexData, reqQuery?.item);
    } else {
      handlingAddTask(selectedCategory?.content, reqQuery?.item);
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => {
        setModalOpen(open);
        if (!open) {
          setMode("");
        }
      }}
    >
      <DialogTrigger>{edit ? null : <CardTodo />}</DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-1 h-fit max-w-[350px] md:max-w-xl">
        <div className="bg-green-300 font-medium text-green-700 p-1 text-[10px] w-fit">
          Category Ammm Todo
        </div>
        <div className="flex flex-col gap-2 w-full py-2 justify-between h-fit">
          <DialogTitle className="font-semibold">
            {edit ? "Edit" : "Add"} your Todo List
          </DialogTitle>
          <div className="flex flex-col w-full gap-4 py-4">
            <div className="w-full bg-white shadow-md rounded-2xl p-4 border border-gray-100">
              <h3 className="text-sm text-gray-500 font-semibold mb-1">
                Selected Category
              </h3>
              <div className="text-lg font-bold text-green-400">
                {selectedCategory?.content || "No category selected"}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm">Task</h3>
              <Input
                onChange={onChangeInput}
                type="text"
                placeholder="Cari disini..."
                name="item"
                value={reqQuery?.item}
              />
            </div>
          </div>
          <Button
            className="w-auto text-white bg-green-400 cursor-pointer border-green-600 hover:bg-slate-100 hover:text-green-600 sm:w-auto"
            onClick={async () => {
              await setMode("");
              await handlingPostTodo();
              await setModalOpen(false);
            }}
            disabled={
              reqQuery?.name?.length < 4 || selectedCategory?.content === ""
            }
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
