import { useTodo } from "@/stores/useTodo";
import { CalendarClock, FileCheck } from "lucide-react";
import { useMemo } from "react";

export const useData = () => {
  const { tasks, selectedCategory } = useTodo();

  const now = new Date();
  const hour = now.getHours();

  let greeting = "Good Morning";
  if (hour >= 12 && hour < 15) {
    greeting = "Good Afternoon";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Good Evening";
  } else if (hour >= 18 || hour < 4) {
    greeting = "Good Night";
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = weekdays[now.getDay()];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const formattedDate = `${dayName} ${day} ${month} ${year}`;

  const filteredTasks = useMemo(() => {
    if (selectedCategory?.content === "") return [];

    const match = tasks?.find(
      (task) => task.category === selectedCategory.content
    );
    return match?.items || [];
  }, [tasks, selectedCategory]);

  const completedCount = filteredTasks.filter((item) => item?.isdone).length;
  const notCompletedCount = filteredTasks.filter(
    (item) => !item?.isdone
  ).length;
  const totalCount = filteredTasks?.length;
  const percentDone =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const SummaryData = [
    {
      title: `${percentDone} %`,
      subTitle: "Clear",
      status: `${completedCount} of ${totalCount} completed`,
      icon: <FileCheck size={16} />,
    },
    {
      title: `${notCompletedCount} left`,
      subTitle: "Tasks Remain",
      status: `${notCompletedCount} of ${totalCount} remaining`,
      icon: <CalendarClock size={16} />,
    },
  ];
  return { SummaryData, greeting, formattedDate };
};
