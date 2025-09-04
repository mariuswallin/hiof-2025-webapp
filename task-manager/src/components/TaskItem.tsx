"use client";

export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
}

export default function TaskItem({ task }: { task: Task }) {
  return (
    <article>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <time dateTime={task.dueDate.toISOString()}>
        {task.dueDate.toLocaleDateString()}
      </time>
    </article>
  );
}
