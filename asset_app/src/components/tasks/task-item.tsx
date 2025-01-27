"use client";

import { Task } from "@/hooks/use-tasks";
import { Trash2, Edit } from "lucide-react";
import Button from "@/components/chromia-ui-kit/button";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent/50">
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "mt-1 size-6 rounded-full cursor-pointer flex justify-center items-center",
          task.completed
            ? "bg-gradient-to-br from-gradientOne to-gradientTwo"
            : "border border-light-veryGrayishBlue dark:border-dark-ultraDarkGrayishBlue hover:border-gradient-to-br from-gradientOne to-gradientTwo"
        )}
      >
        {task.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <motion.path
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              d="M1 4.304L3.696 7l6-6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <span className={cn("text-sm", task.completed && "text-muted-foreground line-through")}>
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
        <Button variant="ghost" size="s" onClick={() => onEdit(task)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="s" onClick={() => onDelete(task.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 