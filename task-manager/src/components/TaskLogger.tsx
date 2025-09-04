"use client";

import type { Task } from "./TaskItem";

export default function TaskLogger({
  task,
  onTaskLog,
}: {
  task: Task;
  onTaskLog: (task: Task) => void;
}) {
  return <button onClick={() => onTaskLog(task)}>Logg task {task.id}</button>;
}
