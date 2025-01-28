"use client";

import React from "react";
import { useFtAccounts } from "@chromia/react";
import { CardLoading } from "@/components/layout/card-loading";
import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";
import { TaskList } from "@/components/tasks/task-list";

export default function HomePage() {
  const { data: ftAccounts, isLoading } = useFtAccounts({ clientConfig });

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-6 py-6">
      {isLoading ? <CardLoading /> : <TaskList />}
    </div>
  );
} 