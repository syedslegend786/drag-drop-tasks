"use client";
import { Column, Task } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import { cn } from "@/utils/styles";
import { TaskList } from "./tasks-list";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Column["id"]) => void;
  tasks: Task[];
}
export function ColumnContainer({
  column,
  deleteColumn,
  tasks,
}: ColumnContainerProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });
  const style = useMemo(
    () => ({
      transition,
      transform: CSS.Transform.toString(transform),
    }),
    [transform, transition]
  );
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border w-[500px] rounded-md overflow-hidden flex flex-col",
        {
          "opacity-40": isDragging,
        }
      )}
    >
      <div className="group p-2 bg-white text-black flex items-center justify-between">
        <h1 className="pl-2">{`Column ${column.title}`}</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
            className="group-hover:opacity-100 opacity-0 transition  hover:bg-gray-200 w-10 h-10 rounded-md flex items-center justify-center"
          >
            <svg
              className="fill-gray-500"
              width="8"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z"></path>
            </svg>
          </button>
          <button
            {...attributes}
            {...listeners}
            className="hover:bg-gray-200 w-10 h-10 rounded-md flex items-center justify-center"
          >
            <svg
              className="cursor-grab fill-gray-500"
              viewBox="0 0 20 20"
              width="12"
            >
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
            </svg>
          </button>
        </div>
      </div>
      <TaskList tasks={tasks} color={column.color} />
    </div>
  );
}
