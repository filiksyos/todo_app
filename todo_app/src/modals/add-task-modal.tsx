"use client";

import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Button from "@/components/chromia-ui-kit/button";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string, dueDate: string) => void;
}

export function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const formattedDate = dueDate ? new Date(dueDate).toISOString() : "";
      onAddTask(title.trim(), description.trim(), formattedDate);
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Task</DialogTitle>
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
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 