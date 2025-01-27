"use client";

import { Task } from "@/hooks/use-tasks";
import { Trash2, Edit } from "lucide-react";
import Button from "@/components/chromia-ui-kit/button";
import { cn } from "@/utils/cn";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors hover:border-primary",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground bg-transparent"
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
            className="transition-opacity"
          >
            <path d="M1 4.304L3.696 7l6-6" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <span
          className={cn(
            "text-sm transition-colors",
            task.completed && "text-muted-foreground line-through"
          )}
        >
          {task.title}
        </span>
        {task.description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p className="mt-1 text-xs text-muted-foreground">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="invisible flex gap-2 group-hover:visible">
        <Button
          variant="ghost"
          size="s"
          onClick={() => onEdit(task)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="s"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 