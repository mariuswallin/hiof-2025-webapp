// app/lib/db/operations.ts

import { ResultHandler } from "@/app/lib/utils/result";
import { Errors } from "@/app/types/errors";
import type { Result } from "@/app/types/result";

export async function executeDbOperation<T>(
  operation: () => Promise<T>
): Promise<Result<T>> {
  try {
    const result = await operation();
    return ResultHandler.success(result);
  } catch (error) {
    console.error("Database operation failed:", error);
    return ResultHandler.failure(error, Errors.INTERNAL_SERVER_ERROR);
  }
}

export async function executePaginatedDbOperation<T>(
  operation: () => Promise<T>
): Promise<Result<T>> {
  return executeDbOperation(operation);
}
