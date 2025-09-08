import type { Task } from "@/components/types";
import { saveTask } from "./task";

const validations = {
  id: (value: string) => value.length > 0,
  name: (value: string) => value.length > 0,
  description: (value: string) => value.length > 0,
  dueDate: (value: string) =>
    new Date(value) && !isNaN(new Date(value).getTime()),
  completed: (value: boolean) => typeof value === "boolean",
};

export const isValidTask = (task: unknown): task is Task => {
  const isObject = typeof task === "object";
  if (!task) return false;
  if (!isObject) return false;
  const hasKeys =
    isObject && Object.keys(validations).every((key) => key in task);

  if (!hasKeys) return false;

  for (const entries of Object.entries(task)) {
    const [key, value] = entries;
    const validateFn = validations[key as keyof typeof validations] as (
      value: unknown
    ) => boolean;
    if (validateFn(value)) continue;
    return false;
  }
  return true;
};

export async function createTask(formData: FormData) {
  "use server";

  // Hente data fra form "name" attr
  const name = formData.get("name");
  const description = formData.get("description");
  const dueDate = formData.get("dueDate");

  const data = {
    id: crypto.randomUUID(),
    name,
    description,
    dueDate,
    completed: false,
  };

  // Validere at dette er en Task og har riktig verdier
  if (!isValidTask(data)) {
    return;
  }
  // Lagre i database
  await saveTask(data);
  return data as Task;
}

export async function createTaskTask(task: Task) {
  "use server";

  // Lagre i database
  await saveTask(task);
  return task;
}
