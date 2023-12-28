"use client";
import { Task } from "@/types";
import { SortableContext } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import { TaskCard } from "./task-card";

interface TaskListProps {
  tasks: Task[];
  color?: string;
}
export function TaskList({ tasks, color }: TaskListProps) {
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  return (
    <div className="bg-[#F6F6F6] p-4 flex-grow flex flex-col gap-3">
      <SortableContext items={taskIds}>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </SortableContext>
    </div>
  );
}
