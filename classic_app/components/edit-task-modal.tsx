"use client";

import { FormEvent, useState, useEffect } from "react";
import { useTodoStore } from "@/utils/store";
import { Modal } from "./ui/modal";
import { cn } from "@/utils/util";
import { TodoType } from "@/utils/store";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: TodoType | null;
}

export function EditTaskModal({ isOpen, onClose, todo }: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { editTodo } = useTodoStore();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
      if (todo.dueDate) {
        const date = new Date(todo.dueDate);
        setDueDate(date.toISOString().split('T')[0]);
      } else {
        setDueDate("");
      }
    }
  }, [todo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todo && title.trim()) {
      const formattedDate = dueDate ? new Date(dueDate).toISOString() : "";
      editTodo(todo.id, {
        ...todo,
        title: title.trim(),
        description: description.trim(),
        dueDate: formattedDate,
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
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
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
} 