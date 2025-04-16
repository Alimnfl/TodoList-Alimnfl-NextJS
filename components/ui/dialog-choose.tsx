import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { Button } from "./button";
import React from "react";

interface DialogChooseProps {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  detail: string;
  titleButton1: string;
  titleButton2: string;
  visible: boolean;
  onPress1: () => void;
  onPress2: () => void;
  onOpenChange: (open: boolean) => void;
}

const DialogChoose = ({
  icon,
  iconColor,
  title,
  detail,
  titleButton1,
  titleButton2,
  visible,
  onPress1,
  onPress2,
  onOpenChange,
}: DialogChooseProps) => {
  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogContent
        className="py-8 flex flex-col items-center justify-center md:px-0 md:max-w-xl rounded-xl max-w-[300px] sm:max-w-[400px]"
        hideClose={true}
      >
        <div className="flex flex-col items-center mx-2 gap-2">
          <div className={`${iconColor}`}>{icon ? icon : null}</div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {detail && (
            <DialogDescription className="text-center mt-2">
              {detail}
            </DialogDescription>
          )}
        </div>

        <div className="flex flex-row w-full justify-center gap-6">
          <Button
            variant="outline"
            className="w-auto text-green-600 cursor-pointer border-green-600 hover:bg-slate-100 hover:text-green-600 sm:w-auto"
            onClick={onPress1}
          >
            {titleButton1}
          </Button>
          <Button
            className="w-auto cursor-pointer bg-green-500 text-white hover:bg-green-600"
            onClick={onPress2}
          >
            {titleButton2}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChoose;
