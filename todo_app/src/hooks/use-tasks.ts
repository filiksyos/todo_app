import { useCallback, useState, useEffect } from 'react';
import { op } from "@chromia/ft4";
import {
  useFtAccounts,
  useFtSession,
  usePostchainClient,
} from "@chromia/react";
import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

export type TaskStatus = 'all' | 'active' | 'completed';
export type SortOrder = 'none' | 'date';

export function useTasks(initialStatus: TaskStatus = 'all') {
  const [status, setStatus] = useState<TaskStatus>(initialStatus);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: ftAccounts } = useFtAccounts({ clientConfig });
  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );
  const { data: client } = usePostchainClient({ config: clientConfig });

  const addTask = useCallback(async (title: string, description?: string, dueDate?: string) => {
    if (!session || !ftAccounts?.length) return;
    setError(null);

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await session
        .transactionBuilder()
        .add(
          op(
            "create_todo",
            newTask.id,
            newTask.title,
            newTask.description ?? "",
            newTask.dueDate ?? "",
            newTask.createdAt,
          ),
        )
        .buildAndSend();
      await fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task');
    }
  }, [session, ftAccounts]);

  const toggleTask = useCallback(async (id: string) => {
    if (!session) return;
    setError(null);

    try {
      await session
        .transactionBuilder()
        .add(op("toggle_todo", id))
        .buildAndSend();
      await fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to toggle task');
    }
  }, [session]);

  const deleteTask = useCallback(async (id: string) => {
    if (!session) return;
    setError(null);

    try {
      await session
        .transactionBuilder()
        .add(op("delete_todo", id))
        .buildAndSend();
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  }, [session]);

  const editTask = useCallback(async (id: string, title: string, description?: string, dueDate?: string) => {
    if (!session) return;
    setError(null);

    try {
      await session
        .transactionBuilder()
        .add(
          op(
            "edit_todo",
            id,
            title,
            description ?? "",
            dueDate ?? "",
          ),
        )
        .buildAndSend();
      await fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
      setError('Failed to edit task');
    }
  }, [session]);

  const fetchTasks = useCallback(async () => {
    if (!session || !ftAccounts?.length) return;
    setIsLoading(true);
    setError(null);

    try {
      const tasks = await session.client.query("get_todos", {
        account_id: ftAccounts[0].id,
      }) as Array<[string, string, string | null, string | null, boolean, string]>;

      const mappedTasks = tasks.map(([id, title, description, dueDate, completed, createdAt]) => ({
        id,
        title,
        description: description || undefined,
        dueDate: dueDate || undefined,
        completed,
        createdAt,
      }));

      setTasks(mappedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [session, ftAccounts]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter(task => {
    if (status === 'active') return !task.completed;
    if (status === 'completed') return task.completed;
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return {
    tasks: filteredTasks,
    status,
    setStatus,
    sortOrder,
    setSortOrder,
    isLoading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    refresh: fetchTasks,
  };
} 