import { stat } from "fs";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskProps = {
  task: string;
  isdone: boolean;
};

export type TasksProps = {
  category: string;
  items: TaskProps[];
};

export type ReqQueryProps = {
  search: string;
  name: string;
  item: string;
  dataValid: string;
};

export type SelectedCategoryProps = {
  content: string;
};

export type TodoState = {
  reqQuery: ReqQueryProps;
  selectedCategory: SelectedCategoryProps;
  tasks: TasksProps[];
  // set ReqQuery
  setReqQuery: (data: object) => void;
  setSelectedCategory: (data: object) => void;

  // Handling
  handlingAddCategory: (categoryName: string) => void;
  handlingEditCategory: (oldName: string, newName: string) => void;
  handlingDeleteCategory: (categoryName: string) => void;

  handlingAddTask: (categoryName: string, task: string) => void;
  handlingToggleTask: (categoryName: string, taskIndex: number) => void;
  handlingDeleteTask: (categoryName: string, taskIndex: number) => void;
  handlingEditTask: (
    categoryName: string,
    taskIndex: number,
    newTask: string
  ) => void;
};

export const useTodo = create<TodoState>()(
  persist(
    (set, get) => ({
      tasks: [],
      reqQuery: {
        search: "",
        name: "",
        item: "",
        dataValid: "",
      },

      selectedCategory: {
        content: "",
      },

      setReqQuery: (data) => {
        set((state) => ({
          reqQuery: { ...state.reqQuery, ...data },
        }));
      },

      setSelectedCategory: (data) => {
        set((state) => ({
          selectedCategory: { ...state.selectedCategory, ...data },
        }));
      },

      handlingAddCategory: (categoryName) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              category: categoryName,
              items: [],
            },
          ],
        }));
        const audio = new Audio("/sfx/correct.mp3");
        audio.play();
        toast.success("Category added was success!");
      },

      handlingEditCategory: (oldName, newName) => {
        if (!newName.trim()) {
          toast.error("New category name cannot be empty.");
          return;
        }

        const exists = get().tasks.some((cat) => cat.category === newName);
        if (exists) {
          toast.error("Category with this name already exists.");
          return;
        }

        set((state) => ({
          tasks: state.tasks.map((cat) =>
            cat.category === oldName ? { ...cat, category: newName } : cat
          ),
          selectedCategory:
            state.selectedCategory.content === oldName
              ? { content: newName }
              : state.selectedCategory,
        }));

        toast.success("Category name updated!");
      },

      handlingDeleteCategory: (categoryName) => {
        set((state) => ({
          tasks: state.tasks.filter((cat) => cat.category !== categoryName),
          selectedCategory:
            state.selectedCategory.content === categoryName
              ? { content: "" }
              : state.selectedCategory,
        }));
        toast.success("Category deleted successfully!");
      },

      handlingAddTask: (categoryName, task) => {
        set((state) => ({
          tasks: state.tasks.map((cat) =>
            cat.category === categoryName
              ? {
                  ...cat,
                  items: [...cat.items, { task, isdone: false }],
                }
              : cat
          ),
        }));
        toast.success("Task added successfully!");
      },

      handlingToggleTask: (categoryName, taskIndex) => {
        const category = get().tasks.find(
          (cat) => cat.category === categoryName
        );
        if (!category || !category.items[taskIndex]) {
          toast.error("Task not found!");
          return;
        }

        const isDone = category.items[taskIndex].isdone;

        set((state) => ({
          tasks: state.tasks.map((cat) =>
            cat.category === categoryName
              ? {
                  ...cat,
                  items: cat.items.map((item, i) =>
                    i === taskIndex ? { ...item, isdone: !item.isdone } : item
                  ),
                }
              : cat
          ),
        }));
        toast.success(`Task marked as ${isDone ? "undone" : "done"}!`);
      },

      handlingDeleteTask: (categoryName, taskIndex) => {
        set((state) => ({
          tasks: state.tasks.map((cat) =>
            cat.category === categoryName
              ? {
                  ...cat,
                  items: cat.items.filter((_, i) => i !== taskIndex),
                }
              : cat
          ),
        }));
        toast.success("Task deleted successfully!");
      },

      handlingEditTask: (categoryName, taskIndex, newTask) => {
        if (!newTask.trim()) {
          toast.error("Task name cannot be empty.");
          return;
        }

        const category = get().tasks.find(
          (cat) => cat.category === categoryName
        );
        if (!category || !category.items[taskIndex]) {
          toast.error("Task not found!");
          return;
        }

        set((state) => ({
          tasks: state.tasks.map((cat) =>
            cat.category === categoryName
              ? {
                  ...cat,
                  items: cat.items.map((item, i) =>
                    i === taskIndex ? { ...item, task: newTask } : item
                  ),
                }
              : cat
          ),
        }));
        toast.success("Task edited successfully!");
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
