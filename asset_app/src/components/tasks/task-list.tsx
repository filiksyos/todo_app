"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useTasks } from "@/hooks/use-tasks";
import { TaskItem } from "./task-item";
import { TaskStatus } from "./task-status";
import { AddTaskModal } from "@/modals/add-task-modal";
import { CardLoading } from '@/components/layout/card-loading';

export function TaskList() {
  const {
    tasks,
    status,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setStatus,
  } = useTasks();

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;

  const handleEdit = (id: string, title: string, description?: string, dueDate?: string) => {
    editTask(id, title, description, dueDate);
  };

  if (isLoading) {
    return <CardLoading />;
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <AddTaskModal onSubmit={addTask} />
      </CardHeader>
      
      <CardContent className="space-y-2">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={handleEdit}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No tasks yet. Add one above!
          </p>
        )}
      </CardContent>

      <CardFooter>
        <TaskStatus
          status={status}
          onStatusChange={setStatus}
          totalTasks={totalTasks}
          activeTasks={activeTasks}
        />
      </CardFooter>
    </Card>
  );
} 