"use client";

import { FormEvent, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button from "@/components/chromia-ui-kit/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEditTask: (id: string, title: string, description: string, dueDate: string) => void;
}

export function EditTaskModal({ isOpen, onClose, task, onEditTask }: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "");
    }
  }, [task]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (task && title.trim()) {
      const formattedDate = dueDate ? new Date(dueDate).toISOString() : "";
      onEditTask(task.id, title.trim(), description.trim(), formattedDate);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
          <Input
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
          <Input
            type="date"
            label="Due Date (Optional)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 