"use client";

import CardSelected from "@/components/card/CardSelected";
import CardTodoList from "@/components/card/CardTodoList";
import EmptyContent from "@/components/fragment/EmptyContent";
import ModalActionTodo from "@/components/modal/ModalActionTodo";
import ModalDeleteTodo from "@/components/modal/ModalDeleteTodo";
import CardSelectedSkeleton from "@/components/skeleton/CardSelectedSkeleton";
import CardTodoListSkeleton from "@/components/skeleton/CardTodoListSkeleton";
import { useTodo } from "@/stores/useTodo";
import { PawPrint } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export default function MainContent() {
  const { tasks, selectedCategory } = useTodo();
  const [modalId, setModalId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = useMemo(() => {
    if (selectedCategory?.content === "") return [];

    const match = tasks?.find(
      (task) => task.category === selectedCategory.content
    );
    return match?.items || [];
  }, [tasks, selectedCategory]);

  return (
    <div className="flex flex-col gap-8">
      {loading ? (
        <CardSelectedSkeleton />
      ) : (
        <CardSelected setModalId={setModalId} />
      )}

      <div
        className="flex flex-col gap-1 pb-10 items-center overflow-y-auto max-h-[620px]"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <CardTodoListSkeleton key={index} />
          ))
        ) : selectedCategory?.content === "" ? (
          <EmptyContent
            title="Nothing selected"
            description="Please select a category to see your tasks"
            icon={<PawPrint className="w-12 h-12 mb-4 text-gray-400" />}
          />
        ) : filteredTasks?.length === 0 ? (
          <EmptyContent
            title="No tasks yet"
            description="Start by adding a new category or task"
            icon={<PawPrint className="w-12 h-12 mb-4 text-gray-400" />}
          />
        ) : (
          filteredTasks?.map((data, index) => (
            <CardTodoList
              data={data}
              index={index}
              key={index}
              modalId={modalId}
              setModalId={setModalId}
            />
          ))
        )}

        {modalId === "delete_cat" && selectedCategory?.content && (
          <ModalDeleteTodo
            data={null}
            indexData={0}
            mode={modalId}
            setMode={setModalId}
          />
        )}

        <div className="fixed bottom-4">
          <ModalActionTodo
            indexData={0}
            data={null}
            mode={modalId}
            edit={false}
            setMode={setModalId}
          />
        </div>
      </div>
    </div>
  );
}
