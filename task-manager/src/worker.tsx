import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";

import { setCommonHeaders } from "./app/headers";
import TaskList from "./components/TaskList";
import TaskFooter from "./components/TaskFooter";
import TaskForm from "./components/TaskForm";
import type { Task } from "./components/types";
import TaskPage from "./components/TaskPage";
import TaskPageAPI from "./components/TaskPageAPI";
import TaskPageAPIModern from "./components/TaskPageAPIModern";

import TaskModern from "./components/TaskSuspense";

import TaskModernWithContext from "./components/TaskPageContext";

export interface Env {}

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    route("/", () => {
      // OBS: Ikke lov da vi har server
      // const taskCreationHandler = (task: Task) => {
      //   // Handle task creation logic here
      // };

      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          {/* <TaskList form={<TaskForm onCreate={taskCreationHandler} />}>
            <TaskFooter />
          </TaskList> */}
          {/* <TaskPage /> */}
          {/* <TaskPageAPI /> */}
          {/* <TaskModern /> */}
          <TaskModernWithContext />
        </div>
      );
    }),
  ]),
]);
