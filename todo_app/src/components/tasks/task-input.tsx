"use client";

import { useState } from "react";
import Button from "@/components/chromia-ui-kit/button";
import Input from "@/components/chromia-ui-kit/input";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" disabled={!title.trim()}>
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
} 