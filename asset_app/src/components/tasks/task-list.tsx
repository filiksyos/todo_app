"use client";

import { Card } from "@/components/ui/card";
import { useTasks } from "@/hooks/use-tasks";
import { TaskInput } from "./task-input";
import { TaskItem } from "./task-item";
import { TaskStatus } from "./task-status";

export function TaskList() {
  const {
    tasks,
    status,
    addTask,
    toggleTask,
    deleteTask,
    setStatus,
  } = useTasks();

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <Card className="w-full max-w-lg space-y-4 p-4">
      <TaskInput onAddTask={addTask} />
      
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No tasks yet. Add one above!
          </p>
        )}
      </div>

      <TaskStatus
        status={status}
        onStatusChange={setStatus}
        totalTasks={totalTasks}
        activeTasks={activeTasks}
      />
    </Card>
  );
} 