"use client";

import TaskItem, { type Task } from "./TaskItem";
import TaskLogger from "./TaskLogger";

export default function TaskCard({
  task,
  loggerFn,
}: {
  task: Task;
  loggerFn: (task: Task) => void;
}) {
  return (
    <section>
      <TaskItem task={task} />
      <TaskLogger task={task} onTaskLog={loggerFn} />
    </section>
  );
}
