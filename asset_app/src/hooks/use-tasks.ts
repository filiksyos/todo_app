import { useState } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type TaskStatus = 'all' | 'active' | 'completed';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<TaskStatus>('all');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = status === 'active'
    ? tasks.filter(task => !task.completed)
    : status === 'completed'
    ? tasks.filter(task => task.completed)
    : tasks;

  return {
    tasks: filteredTasks,
    status,
    addTask,
    toggleTask,
    deleteTask,
    setStatus,
  };
} 