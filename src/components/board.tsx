"use client";
import { Column, Task } from "@/types";
import React, { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { ColumnContainer } from "./column-container";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { columnsContainerData, tasksData } from "@/data/tasks";
import { TaskCard } from "./task-card";
import { generateNextLetter } from "@/utils/generateNextLetter";
export function Board() {
  const [columns, setcolumns] = useState<Column[]>(columnsContainerData);
  const [tasks, settasks] = useState<Task[]>(tasksData);
  const [currentDraggingColumnContainer, setcurrentDraggingColumnContainer] =
    useState<Column | null>(null);
  const [currentDraggingTask, setcurrentDraggingTask] = useState<null | Task>(
    null
  );
  function generateColumns() {
    setcolumns((prev) => [
      ...prev,
      {
        id: uuid(),
        title: columns[columns.length - 1]?.title
          ? generateNextLetter(columns[columns.length - 1]?.title)
          : "A",
      },
    ]);
  }
  const deleteColumn = useCallback(
    (id: Column["id"]) => {
      const filteredColumn = columns.filter((item) => item.id !== id);
      setcolumns(filteredColumn);
    },
    [columns]
  );
  const sortableItems = useMemo(
    () => columns.map((item) => item.id),
    [columns]
  );
  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setcurrentDraggingColumnContainer(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setcurrentDraggingTask(event.active.data.current?.task);
    }
  }, []);
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      setcurrentDraggingColumnContainer(null);
      setcurrentDraggingTask(null);
      if (
        event.active?.data.current?.type === "Column" &&
        event.over?.data?.current?.type === "Column"
      ) {
        const activeIndex = event.active.data.current?.sortable.index;
        const overIndex = event.over.data.current?.sortable.index;
        const newColumns = [...columns];
        const temp = newColumns[activeIndex];
        newColumns[activeIndex] = newColumns[overIndex];
        newColumns[overIndex] = temp;
        console.log({ newColumns });
        setcolumns(newColumns);
      }
    },
    [columns]
  );
  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const { over, active } = event;
      if (!over) {
        return;
      }
      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) {
        return;
      }
      // dropping task over another task
      const isActiveATask = active.data.current?.type === "Task";
      const isOverATask = over.data.current?.type === "Task";
      if (!isActiveATask) return;
      if (isActiveATask && isOverATask) {
        settasks((prev) => {
          const activeIndex = prev.findIndex((t) => t.id === activeId);
          const overIndex = prev.findIndex((t) => t.id === overId);
          prev[activeIndex].columnId = prev[overIndex].columnId;
          return arrayMove(prev, activeIndex, overIndex);
        });
      }

      const isOverAColumn = over.data.current?.type === "Column";
      if (isActiveATask && isOverAColumn) {
        settasks((prev) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);
          prev[activeIndex].columnId = overId;
          return arrayMove(prev, activeIndex, activeIndex);
        });
      }
    },
    [tasks]
  );
  return (
    <div className="min-h-screen flex flex-col w-full overflow-y-hidden overflow-x-auto px-[40px] py-10">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-10">
          <div className="flex gap-10">
            <SortableContext items={sortableItems}>
              {columns.map((item) => (
                <ColumnContainer
                  deleteColumn={deleteColumn}
                  column={item}
                  key={item.id}
                  tasks={tasks.filter((task) => task.columnId === item.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={generateColumns}
            className="shrink-0 border p-2 rounded w-[500px]"
          >
            Add Container
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {currentDraggingColumnContainer && (
              <ColumnContainer
                column={currentDraggingColumnContainer}
                deleteColumn={deleteColumn}
                tasks={tasks.filter(
                  (item) => item.columnId === currentDraggingColumnContainer.id
                )}
              />
            )}
            {currentDraggingTask && <TaskCard task={currentDraggingTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
