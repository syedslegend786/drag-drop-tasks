"use client";
import { Task } from "@/types";
import { cn } from "@/utils/styles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo } from "react";
interface TaskProps {
  task: Task;
}
export function TaskCard({ task }: TaskProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
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
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "relative p-4 rounded bg-white border overflow-hidden cursor-grab",
        {
          "opacity-40": isDragging,
        }
      )}
    >
      {/* left-line */}
      <div
        className="absolute left-0 inset-y-0 w-[3px] "
        style={{ backgroundColor: task.color }}
      />
      {task.title}
    </div>
  );
}
