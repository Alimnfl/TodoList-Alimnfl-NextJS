import { AlertOctagon } from "lucide-react";
import React from "react";

const AlertAnnouncement = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) => {
  return (
    <div
      className={`${className} flex flex-row gap-2 text-start bg-green-300 p-4 rounded-md items-start`}
    >
      <AlertOctagon className="text-green-700" />
      <div className="flex flex-col gap-1 text-[11px]">
        <h2 className="font-semibold text-green-700">{title}</h2>
        <p className="text-green-600">{description}</p>
      </div>
    </div>
  );
};

export default AlertAnnouncement;
