// /app/components/__tests__/QuestionsPage.test.tsx

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import * as apiModule from "../services/api";
import type { Question } from "../types/core";
import { QuestionsPage } from "../components/QuestionsPage";

vi.mock("../services/api", () => ({
  simulateApiCall: vi.fn(),
}));

const mockApi = vi.mocked(apiModule);

// MOCK DATA: Test data for consistent testing
const mockQuestions: Question[] = [
  {
    id: "1",
    question: "React hooks",
    answers: [],
    status: "published",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    question: "TypeScript generics",
    answers: [],
    status: "published",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    question: "Next.js routing",
    answers: [],
    status: "draft",
    createdAt: new Date("2024-01-03"),
  },
];

describe.only("QuestionsPage", () => {
  let mockConsoleLog: any;
  let mockConsoleError: any;
  beforeEach(() => {
    // SPY: Spy on console.log and console.error to verify interactions
    mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe("Loading State", () => {
    it("shows loading spinner while fetching data", async () => {
      // ARRANGE: Mock API to never resolve (simulate slow network)
      let resolvePromise: (value: Question[]) => void;
      const pendingPromise = new Promise<Question[]>((resolve) => {
        resolvePromise = resolve;
      });
      mockApi.simulateApiCall.mockReturnValue(pendingPromise);

      // ACT: Render page
      render(<QuestionsPage />);
      const loadingElement = await screen.findByTestId("loading");

      // ASSERT: Use async selectors instead of waitFor
      expect(loadingElement).toBeInTheDocument();
      expect(screen.getByText(/henter data fra server/i)).toBeInTheDocument();

      // CLEANUP: Resolve promise to avoid hanging test
      resolvePromise!(mockQuestions);

      // Use async selector to wait for loading to disappear
      await expect(
        screen.findByText(/react hooks/i)
      ).resolves.toBeInTheDocument();
      expect(loadingElement).not.toBeInTheDocument();
    });

    it("handles abort controller properly during loading", async () => {
      // ARRANGE: Mock API that checks for abort signal
      const abortSpy = vi.fn();
      mockApi.simulateApiCall.mockImplementation((signal) => {
        signal?.addEventListener("abort", abortSpy);
        return new Promise(() => {}); // Never resolves
      });

      // ACT: Render and immediately unmount
      const { unmount } = render(<QuestionsPage />);
      const loadingElement = await screen.findByTestId("loading");
      expect(loadingElement).toBeInTheDocument();

      unmount();

      // ASSERT: Abort should be called on unmount
      await waitFor(() => {
        expect(abortSpy).toHaveBeenCalled();
      });
    });
  });

  describe("Error State", () => {
    it("shows error message when fetch fails", async () => {
      // ARRANGE: Mock API to reject with network error
      const errorMessage = "Nettverksfeil: Kunne ikke koble til server";
      mockApi.simulateApiCall.mockRejectedValue(new Error(errorMessage));

      // ACT: Render page
      render(<QuestionsPage />);

      // ASSERT: Use async selectors for error state
      await expect(
        screen.findByText(/noe gikk galt/i)
      ).resolves.toBeInTheDocument();
      //const errMessage = await screen.findByText(/kunne ikke hente spørsmål/i);
      const retryButton = await screen.findByRole("button", {
        name: /prøv igjen/i,
      });
      //expect(errMessage).toBeInTheDocument();
      expect(retryButton).toBeInTheDocument();
    });

    it("shows retry count in error message after failed retries", async () => {
      // ARRANGE: Mock API to always fail
      const errorMessage = "Nettverksfeil: Kunne ikke koble til server";
      mockApi.simulateApiCall.mockRejectedValue(new Error(errorMessage));

      const user = userEvent.setup({
        delay: null, // Disable delay for faster tests
      });
      render(<QuestionsPage />);

      // ACT & ASSERT: First error (initial load)
      const retryButton = await screen.findByRole("button", {
        name: /prøv igjen/i,
      });

      // Should show error without retry count initially
      expect(screen.getByText(errorMessage)).toBeInTheDocument();

      // First retry click
      await user.click(retryButton);

      // Should show error with retry count 2
      await screen.findByText(`${errorMessage} (Forsøk 2)`);

      // Second retry click
      const retryButton2 = screen.getByRole("button", { name: /prøv igjen/i });
      await user.click(retryButton2);

      // Should show error with retry count 3
      await screen.findByText(`${errorMessage} (Forsøk 3)`);

      // ASSERT: Verify API was called 3 times (initial + 2 retries)
      expect(mockApi.simulateApiCall).toHaveBeenCalledTimes(3);
    });

    it("retries data fetching when retry button is clicked", async () => {
      // ARRANGE: Mock API to fail first, then succeed
      mockApi.simulateApiCall
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce(mockQuestions);

      render(<QuestionsPage />);

      // ACT: Wait for error, then click retry
      const retryButton = await screen.findByRole("button", {
        name: /prøv igjen/i,
      });
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByTestId("loading")).toBeInTheDocument();
      });

      await expect(
        screen.findByRole("heading", { name: /spørsmålshåndtering/i })
      ).resolves.toBeInTheDocument();

      await expect(
        screen.findByText(/react hooks/i)
      ).resolves.toBeInTheDocument();

      // VERIFY: API was called twice (initial + retry) and retry count reset
      expect(mockApi.simulateApiCall).toHaveBeenCalledTimes(2);
      expect(screen.queryByText(/forsøk/i)).not.toBeInTheDocument();
    });
  });

  describe("Success State", () => {
    it("shows question table when data loads successfully", async () => {
      // ARRANGE: Mock successful API response
      mockApi.simulateApiCall.mockResolvedValue(mockQuestions);

      // ACT: Render page
      render(<QuestionsPage />);

      // ASSERT: Use async selectors to wait for data
      await expect(
        screen.findByText(/react hooks/i)
      ).resolves.toBeInTheDocument();
      await expect(
        screen.findByText(/typescript generics/i)
      ).resolves.toBeInTheDocument();
      await expect(
        screen.findByText(/next\.js routing/i)
      ).resolves.toBeInTheDocument();

      // Verify page header is present
      expect(
        screen.getByRole("heading", { name: /spørsmålshåndtering/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/administrer og organiser dine spørsmål/i)
      ).toBeInTheDocument();

      // Verify API was called correctly
      expect(mockApi.simulateApiCall).toHaveBeenCalledTimes(1);
      expect(mockApi.simulateApiCall).toHaveBeenCalledWith(
        expect.any(AbortSignal)
      );
    });

    it("handles user interactions after data loads", async () => {
      // ARRANGE: Mock successful API response and set up user
      mockApi.simulateApiCall.mockResolvedValue(mockQuestions);
      const user = userEvent.setup();

      render(<QuestionsPage />);

      // ACT: Wait for data to load using async selector
      await screen.findByText(/react hooks/i);

      const viewButtons = await screen.findAllByRole("button", {
        name: /se detaljer/i,
      });
      const editButtons = await screen.findAllByRole("button", {
        name: /rediger/i,
      });
      const deleteButtons = await screen.findAllByRole("button", {
        name: /slett/i,
      });

      // Test all interaction types
      await user.click(viewButtons[0]);
      await user.click(editButtons[1]);
      await user.click(deleteButtons[2]);

      // ASSERT: All interactions work as expected
      expect(mockConsoleLog).toHaveBeenCalledWith("Viser spørsmål:", "3");
      expect(mockConsoleLog).toHaveBeenCalledWith("Redigerer spørsmål:", "2");
      expect(mockConsoleLog).toHaveBeenCalledWith("Sletter spørsmål:", "1");
    });

    it("displays correct question count in table filters", async () => {
      // ARRANGE: Mock successful API response
      mockApi.simulateApiCall.mockResolvedValue(mockQuestions);

      render(<QuestionsPage />);

      // ASSERT: Wait for data and verify counts using async selectors
      await screen.findByText(/react hooks/i);

      // Verify total count is displayed (assuming TableFilters shows this)
      await expect(
        screen.findAllByTestId("table-row-item")
      ).resolves.toHaveLength(mockQuestions.length);
    });
  });

  describe("Cleanup", () => {
    it("cleans up properly on unmount during loading", async () => {
      // ARRANGE: Mock long-running request
      const abortSpy = vi.fn();
      mockApi.simulateApiCall.mockImplementation((signal) => {
        signal?.addEventListener("abort", abortSpy);
        return new Promise(() => {}); // Never resolves
      });

      // ACT: Render then unmount quickly
      const { unmount } = render(<QuestionsPage />);
      const loadingElement = await screen.findByTestId("loading");
      expect(loadingElement).toBeInTheDocument();

      unmount();

      // ASSERT: Cleanup was called
      expect(abortSpy).toHaveBeenCalled();
    });
  });
});
