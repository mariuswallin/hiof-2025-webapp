import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "./app/Document";

import { setCommonHeaders } from "./app/headers";

export default defineApp([
  setCommonHeaders(),
  render(Document, [
    route("/", () => {
      return (
        <div>
          <h1>Frontpage</h1>
        </div>
      );
    }),
  ]),
]);
