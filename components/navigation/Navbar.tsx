"use client";

import React, { useEffect, useState } from "react";
import CardCategory from "../card/CardCategory";
import ModalAddCategory from "../modal/ModalAddCategory";
import { useTodo } from "@/stores/useTodo";
import { motion, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import CardCategorySkeleton from "../skeleton/CardCategorySkeleton";

export default function Navbar() {
  const { tasks } = useTodo();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const controls = useAnimation();

  const toggleSidebar = (open: boolean) => {
    setIsOpen(open);
    if (isMobile) {
      controls.start({
        x: open ? 0 : "-100%",
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        controls.set({ x: "0%" });
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => isMobile && toggleSidebar(false),
    onSwipedRight: () => isMobile && toggleSidebar(true),
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div className="relative md:static">
      <div
        {...handlers}
        className={`fixed top-0 left-0 h-full ${
          isOpen ? "w-full" : "w-[10%]"
        } z-20 md:hidden`}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}

      <motion.div
        animate={isMobile ? controls : undefined}
        initial={{
          x: !isOpen ? "-100%" : "0",
        }}
        className="fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col gap-3 z-50 min-h-screen md:translate-x-0 md:shadow-none min-w-[350px]"
      >
        <div className="py-10 flex flex-col gap-2 w-full">
          <div className="flex text-2xl font-semibold flex-row gap-3 bg-green-500 w-fit rounded-xl px-2 py-1 text-white">
            <span>@</span>
            <h2 className="">Todo Alimnfl</h2>
          </div>
          <span className="text-gray-600 sm:text-base text-sm">
            Your companion for a more organized journey
          </span>
        </div>

        <div className="flex flex-col w-full py-4 gap-2 min-h-[300px]">
          {loading
            ? Array?.from({ length: 2 })?.map((_, index) => (
                <CardCategorySkeleton create={false} key={index} />
              ))
            : tasks?.map((data, index) => (
                <CardCategory
                  toggleSidebar={toggleSidebar}
                  create={false}
                  data={data}
                  key={index}
                />
              ))}
        </div>

        {loading ? (
          <CardCategorySkeleton create={true} />
        ) : (
          <ModalAddCategory />
        )}
      </motion.div>

      {isMobile && !isOpen && (
        <button
          className="fixed top-4 left-4 bg-white border shadow px-2 py-1 rounded-md md:hidden z-50"
          onClick={() => toggleSidebar(true)}
        >
          ☰
        </button>
      )}
    </div>
  );
}
