"use client";

import type { TaskStatus } from "@/hooks/use-tasks";
import { cn } from "@/utils/cn";

interface TaskStatusProps {
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  totalTasks: number;
  activeTasks: number;
}

export function TaskStatus({
  status,
  onStatusChange,
  totalTasks,
  activeTasks,
}: TaskStatusProps) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <span className="text-sm text-muted-foreground">
        {activeTasks} item{activeTasks !== 1 ? "s" : ""} left
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange("all")}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            status === "all" ? "text-primary" : "text-muted-foreground"
          )}
        >
          All
        </button>
        <button
          onClick={() => onStatusChange("active")}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            status === "active" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Active
        </button>
        <button
          onClick={() => onStatusChange("completed")}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            status === "completed" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Completed
        </button>
      </div>
      <span className="text-sm text-muted-foreground">
        Total: {totalTasks}
      </span>
    </div>
  );
} 