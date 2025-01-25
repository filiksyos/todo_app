"use client";

import { Task } from "@/hooks/use-tasks";
import { Trash2 } from "lucide-react";
import Button from "@/components/chromia-ui-kit/button";
import { cn } from "@/utils/cn";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground"
        )}
      >
        {task.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 4.304L3.696 7l6-6" />
          </svg>
        )}
      </button>
      <span
        className={cn(
          "flex-1 text-sm transition-colors",
          task.completed && "text-muted-foreground line-through"
        )}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="invisible group-hover:visible"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
} 