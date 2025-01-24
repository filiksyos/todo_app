"use client";

import { TodoType, useTodoStore } from "@/utils/store";
import TodoStatus from "./todo-status";
import { cn } from "@/utils/util";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import MobileStatus from "./mobile-status";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { EditTaskModal } from "./edit-task-modal";
import iconCross from "../../public/assets/icon-cross.svg";
import iconEdit from "../../public/assets/icon-edit.svg";

function TodoList() {
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);
  const { todos, completeTodo, status, deleteTodo, reorderTodos } = useTodoStore();
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    console.log('Filtering with status:', status);
    const newFilteredTodos = status === "active" 
      ? todos.filter((todo) => !todo.completed)
      : status === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos;
    
    console.log('Filtered todos:', newFilteredTodos);
    setFilteredTodos(newFilteredTodos);
  }, [status, todos]);

  const handleEdit = (todo: TodoType) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleReorder = (newOrder: TodoType[]) => {
    setFilteredTodos(newOrder);
    // If we're showing all todos, update the store
    if (status === "all") {
      reorderTodos(newOrder);
    }
  };

  return (
    <Fragment>
      <div className="mt-6  rounded-md bg-white shadow-lg dark:bg-dark-veryDarkDesaturatedBlue">
        {filteredTodos?.length > 0 && (
          <Reorder.Group
            axis="y"
            values={filteredTodos}
            onReorder={handleReorder}
            className="overflow-hidden"
          >
            <AnimatePresence>
              {filteredTodos?.map((todo) => (
                <Reorder.Item
                  initial={{ opacity: 0, y: -30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  exit={{ opacity: 0, y: -30, transition: { duration: 0.25 } }}
                  value={todo}
                  key={todo.id}
                  // The group/item class enables hover functionality for the todo item
                  className="group/item relative flex cursor-grabbing items-start gap-6 border-b border-x-light-veryGrayishBlue px-6 py-5 dark:border-dark-ultraDarkGrayishBlue"
                >
                  <span
                    className={cn(
                      "mt-1 size-6 rounded-full cursor-pointer flex transition-all justify-center items-center",
                      todo.completed
                        ? "bg-gradient-to-br from-gradientOne to-gradientTwo"
                        : "border border-light-veryGrayishBlue dark:border-dark-ultraDarkGrayishBlue hover:border-gradient-to-br from-gradientOne to-gradientTwo"
                    )}
                    onClick={() => completeTodo(todo.id)}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                      >
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
                  </span>
                  <div className="flex-1 space-y-2">
                    <span
                      className={cn(
                        "inline-block capitalize text-xs lg:text-lg text-light-veryDarkGrayishBlue cursor-pointer dark:text-dark-lightGrayishBlue",
                        todo.completed
                          ? "line-through text-light-lightGrayishBlue dark:text-dark-veryDarkGrayishBlue"
                          : ""
                      )}
                      onClick={() => completeTodo(todo.id)}
                    >
                      {todo.title}
                    </span>
                    {todo.description && (
                      <p className={cn(
                        "text-xs text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue",
                        todo.completed ? "line-through" : ""
                      )}>
                        {todo.description}
                      </p>
                    )}
                    {todo.dueDate && (
                      <p className={cn(
                        "text-xs text-light-darkGrayishBlue dark:text-dark-darkGrayishBlue",
                        todo.completed ? "line-through" : ""
                      )}>
                        Due: {todo.dueDate}
                      </p>
                    )}
                  </div>
                  <div className="invisible absolute right-6 top-5 flex items-center gap-3 group-hover/item:visible">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(todo);
                      }}
                    >
                      <Image src={iconEdit} alt="edit icon" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                      }}
                    >
                      <Image src={iconCross} alt="cross icon" />
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
        <TodoStatus />
      </div>
      <MobileStatus />
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        todo={editingTodo}
      />
    </Fragment>
  );
}

export default TodoList;
