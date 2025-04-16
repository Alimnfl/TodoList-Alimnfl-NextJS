import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardCategory from "../card/CardCategory";
import { Input } from "../ui/input";
import { useTodo } from "@/stores/useTodo";
import { Button } from "../ui/button";

export default function ModalAddCategory() {
  const { reqQuery, setReqQuery, handlingAddCategory } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReqQuery({ [name]: value });
  };

  const handlingPostCategory = () => {
    handlingAddCategory(reqQuery?.name);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger>
        <CardCategory toggleSidebar={null} data={null} create={true} />
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col gap-1 h-fit max-w-[350px] md:max-w-xl">
        <div className="bg-green-300 font-medium text-green-700 p-1 text-[10px] w-fit">
          Category Todo Alimnfl
        </div>
        <div className="flex flex-col gap-2 w-full py-2 justify-between h-fit">
          <DialogTitle className="font-semibold">
            Add your category for your Todo List.
          </DialogTitle>
          <div className="flex flex-row w-full gap-2">
            <Input
              onChange={onChangeInput}
              type="text"
              placeholder="Cari disini..."
              name="name"
              value={reqQuery?.name}
            />
          </div>
          <Button
            className="w-auto text-white bg-green-400 cursor-pointer border-green-600 hover:bg-slate-100 hover:text-green-600 sm:w-auto"
            onClick={async () => {
              await handlingPostCategory();
              await setModalOpen(false);
            }}
            disabled={reqQuery?.name?.length < 4}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
