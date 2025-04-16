import DialogChoose from "@/components/ui/dialog-choose";
import { TaskProps, useTodo } from "@/stores/useTodo";
import { OctagonAlert } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ModalDeleteTodoProps {
  mode: string;
  setMode: (data: string) => void;
  data: TaskProps | null;
  indexData: number;
}

export default function ModalDeleteTodo({
  mode,
  setMode,
  data,
  indexData,
}: ModalDeleteTodoProps) {
  const { handlingDeleteTask, selectedCategory, handlingDeleteCategory } =
    useTodo();

  const [dialogChoose, setDialogChoose] = useState(false);

  useEffect(() => {
    if (mode === "delete" || mode === "delete_cat") {
      setDialogChoose(true);
    }
  }, [mode]);

  const handlingDeleteData = () => {
    if (mode === "delete_cat") {
      handlingDeleteCategory(selectedCategory?.content);
    } else {
      handlingDeleteTask(selectedCategory?.content, indexData);
    }
  };

  return (
    <DialogChoose
      visible={dialogChoose}
      onOpenChange={(open) => {
        setDialogChoose(open);
        if (!open) setMode("");
      }}
      icon={<OctagonAlert size={100} />}
      iconColor="text-yellow-500"
      title={mode === "delete_cat" ? "Delete Category" : "Delete Task"}
      detail={
        mode === "delete_cat"
          ? `Are you sure you want to delete this category: ${selectedCategory?.content}`
          : `Are you sure you want to delete "${data?.task}"?`
      }
      titleButton1="No"
      titleButton2="Yes"
      onPress1={() => {
        setDialogChoose(false);
        setMode("");
      }}
      onPress2={() => {
        setDialogChoose(false);
        handlingDeleteData();
        setMode("");
      }}
    />
  );
}
