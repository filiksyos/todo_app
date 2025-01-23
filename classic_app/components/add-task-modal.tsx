"use client";

import { FormEvent, useState } from "react";
import { useTodoStore } from "@/utils/store";
import { Modal } from "./ui/modal";
import { cn } from "@/utils/util";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim(), description.trim(), dueDate.trim());
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-md px-4 py-2 text-sm text-black shadow-lg focus:outline-none dark:bg-dark-ultraDarkGrayishBlue dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (Optional)"
            className="w-full rounded-md px-4 py-2 text-sm text-black shadow-lg focus:outline-none dark:bg-dark-ultraDarkGrayishBlue dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due date (Optional)"
            className="w-full rounded-md px-4 py-2 text-sm text-black shadow-lg focus:outline-none dark:bg-dark-ultraDarkGrayishBlue dark:text-white"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-light-darkGrayishBlue hover:text-light-veryDarkGrayishBlue dark:text-dark-darkGrayishBlue dark:hover:text-dark-lightGrayishBlue"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={cn(
              "rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600",
              "bg-gradient-to-r from-gradient-from to-gradient-to hover:opacity-80"
            )}
          >
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
} 