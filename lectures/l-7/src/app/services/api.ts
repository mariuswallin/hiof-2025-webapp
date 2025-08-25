// /app/services/api.ts

import { questions } from "../data/questions";
import type { Question } from "../types/core";

// Simulate an API call to fetch questions
export async function simulateApiCall(
  signal?: AbortSignal
): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    const randomAmount = Math.floor(Math.random() * 5) + 1; // Randomly return 1-5 questions
    const data = questions.slice(0, randomAmount);
    // Check if the request has been aborted
    if (signal?.aborted) {
      reject(new DOMException("Request was aborted", "AbortError"));
      return;
    }

    const timeoutId = setTimeout(() => {
      const shouldFail = Math.random() < 0.7; // 30%  chance of failure

      if (shouldFail) {
        reject(new Error("Nettverksfeil: Kunne ikke koble til server"));
      } else {
        console.log("Simulated API response:", data.length);
        resolve(data);
      }
    }, 2000);

    // Cleanup function to clear the timeout if the request is aborted
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(
          new DOMException(`Request was aborted ${data.length}`, "AbortError")
        );
      });
    }
  });
}

// Utility for simulating different API responses during testing
export const simulateApiError = (
  errorMessage: string = "API Error"
): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(errorMessage));
    }, 1000);
  });
};

// Simulate slow API for testing loading states
export const simulateSlowApi = (): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await simulateApiCall();
      resolve(data);
    }, 5000); // 5 sekunder delay
  });
};
