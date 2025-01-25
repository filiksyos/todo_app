"use client";

import React, { useState } from 'react';
import { Task } from '@/hooks/use-tasks';
import { EditTaskModal } from '@/modals/edit-task-modal';
import Button from '@/components/chromia-ui-kit/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string, dueDate?: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    try {
      setIsToggling(true);
      await onToggle(task.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
      <button
        onClick={handleToggle}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
          task.completed
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground"
        )}
        disabled={isToggling}
      >
        {task.completed && (
          <div className="h-2 w-2 rounded-full bg-current" />
        )}
      </button>
      <div className="flex-1">
        <h3
          className={cn(
            "font-medium",
            task.completed && "text-muted-foreground line-through"
          )}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
        {task.dueDate && (
          <p className="mt-1 text-xs text-muted-foreground">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="invisible flex gap-2 group-hover:visible">
        <EditTaskModal 
          task={task} 
          onSave={(title, description, dueDate) => onEdit(task.id, title, description, dueDate)} 
        />
        <Button
          variant="ghost"
          size="s"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 