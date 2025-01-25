//manages the UI form that says: Tasks, Add New
"use client";

import { useState } from "react";
import { AddTaskModal } from "./add-task-modal";
import { cn } from "@/utils/util";

function FormInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between rounded-md bg-white px-6 py-4 shadow-lg dark:bg-dark-veryDarkDesaturatedBlue">
      <span className="text-sm text-light-veryDarkGrayishBlue dark:text-dark-lightGrayishBlue lg:text-lg">
        Tasks
      </span>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "rounded-md px-4 py-2 text-sm text-white",
          "bg-gradient-to-br from-gradientOne to-gradientTwo hover:opacity-90"
        )}
      >
        Add New
      </button>
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default FormInput;
