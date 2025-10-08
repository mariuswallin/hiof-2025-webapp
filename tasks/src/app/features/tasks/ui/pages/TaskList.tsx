import { Suspense } from "react";

import type { RequestInfo } from "rwsdk/worker";
import { taskService } from "../../tasksService";
import TaskListPageData from "../TaskListPage";

export default async function TaskListPage(props: RequestInfo) {
  const searchParams = new URLSearchParams(props.request.url);
  const taskListPromise = taskService.list(Object.fromEntries(searchParams));

  return (
    <div className="container mx-auto">
      <h1>Task List</h1>
      <Suspense
        fallback={
          <div className="loading">
            <p className="text">Loading...</p>
          </div>
        }
      >
        <TaskListPageData promise={taskListPromise} />
      </Suspense>
    </div>
  );
}
