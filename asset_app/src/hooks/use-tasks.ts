import { useCallback, useState } from 'react';
import { useFtClient, useFtQuery, useFtOperation } from '@chromia/react';
import { publicClientConfig as clientConfig } from '@/utils/generate-client-config';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

export type TaskStatus = 'all' | 'active' | 'completed';

export function useTasks() {
  const { data: account } = useFtClient({ clientConfig });
  const [status, setStatus] = useState<TaskStatus>('all');

  const { data: tasks = [], isLoading } = useFtQuery({
    name: status === 'all' ? 'get_tasks' : 'get_filtered_tasks',
    args: status === 'all' 
      ? [account?.id] 
      : [account?.id, status === 'completed'],
    clientConfig,
    enabled: !!account?.id,
  });

  const { mutate: createTask } = useFtOperation({
    name: 'create_task',
    clientConfig,
  });

  const { mutate: updateTask } = useFtOperation({
    name: 'update_task',
    clientConfig,
  });

  const { mutate: toggleTask } = useFtOperation({
    name: 'toggle_task',
    clientConfig,
  });

  const { mutate: deleteTask } = useFtOperation({
    name: 'delete_task',
    clientConfig,
  });

  const addTask = useCallback((title: string, description?: string, dueDate?: string) => {
    if (!account?.id) return;
    createTask({
      args: [
        title,
        description || '',
        dueDate ? new Date(dueDate).getTime() : 0
      ],
    });
  }, [account?.id, createTask]);

  const editTask = useCallback((id: string, title: string, description?: string, dueDate?: string) => {
    if (!account?.id) return;
    updateTask({
      args: [
        id,
        title,
        description || '',
        dueDate ? new Date(dueDate).getTime() : 0
      ],
    });
  }, [account?.id, updateTask]);

  const handleToggleTask = useCallback((id: string) => {
    if (!account?.id) return;
    toggleTask({
      args: [id],
    });
  }, [account?.id, toggleTask]);

  const handleDeleteTask = useCallback((id: string) => {
    if (!account?.id) return;
    deleteTask({
      args: [id],
    });
  }, [account?.id, deleteTask]);

  const formattedTasks: Task[] = tasks.map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.due_date ? new Date(task.due_date).toISOString() : undefined,
    completed: task.completed,
    createdAt: new Date(task.created_at).toISOString(),
  }));

  return {
    tasks: formattedTasks,
    status,
    isLoading,
    addTask,
    toggleTask: handleToggleTask,
    deleteTask: handleDeleteTask,
    editTask,
    setStatus,
  };
} 