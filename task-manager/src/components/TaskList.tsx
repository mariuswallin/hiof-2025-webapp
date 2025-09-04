"use client";

import TaskCard from "./TaskCard";
import type { Task } from "./TaskItem";
import { TASKS } from "./tasks";

export default function TaskList() {
  const handleTaskLog = (task: Task) => {
    console.log("Logging task:", task);
  };

  return (
    <section>
      <h2>Task List</h2>
      {TASKS.map((task) => (
        <TaskCard key={task.id} task={task} loggerFn={handleTaskLog} />
      ))}
    </section>
  );
}
