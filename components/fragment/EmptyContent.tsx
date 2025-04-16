// components/Empty.tsx
import { ReactElement } from "react";

export default function EmptyContent({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
      <span>{icon}</span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
}
