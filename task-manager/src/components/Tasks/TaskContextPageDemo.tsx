import TaskContextLayoutDemo from "./TaskContextLayoutDemo";
import TaskContextList from "./TaskContextList";

export default function TaskContextPageDemo() {
  return (
    <main className="page">
      <TaskContextLayoutDemo>
        <h1>Task Context Demo</h1>
        <TaskContextList />
      </TaskContextLayoutDemo>
    </main>
  );
}
