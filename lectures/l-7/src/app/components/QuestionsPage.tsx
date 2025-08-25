// app/components/QuestionsPage.tsx
"use client";

import { useTableFilters } from "../hooks/useTableFilters";
import { TableFilters } from "./TableFilters";
import { QuestionTable } from "./QuestionTable";
import type { Question } from "../types/core";
import { useEffect, useState, useRef } from "react";
import { simulateApiCall } from "../services/api";
import { Loading } from "./Loading";
import { ErrorState } from "./ErrorState";

interface QuestionsPageProps {
  initialQuestions?: Question[];
  title?: string;
  subtitle?: string;
}

type Status = "idle" | "loading" | "error" | "success";

export function QuestionsPage({
  initialQuestions,
  title = "Spørsmålshåndtering",
  subtitle = "Administrer og organiser dine spørsmål",
}: QuestionsPageProps) {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions || []
  );
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [status, setStatus] = useState<Status>(
    initialQuestions ? "success" : "loading"
  );

  const isLoading = status === "loading";
  const isError = error || status === "error";
  const isIdle = status === "idle";
  const isSuccess = status === "success";

  // Ref to hold the AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchQuestions = async () => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setStatus("loading");
      setError(null);

      // Send abort signal to simulateApiCall
      const data = await simulateApiCall(abortController.signal);

      // Check if the request was aborted before updating state
      if (!abortController.signal.aborted) {
        setQuestions(data);
        setRetryCount(0);
        setStatus("success");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      // No update if request is aborted
      if (!abortController.signal.aborted) {
        if (err instanceof Error && err.name === "AbortError") {
          // Ignore AbortError it is expected when the request is cancelled
          return;
        }
        const errorMessage =
          err instanceof Error ? err.message : "Kunne ikke hente spørsmål";

        setError(errorMessage);
        setStatus("error");
      }
    } finally {
      // Only update loading state if not aborted
      if (!abortController.signal.aborted && status !== "error") {
        setStatus("idle");
      }
    }
  };

  // Initial data loading
  useEffect(() => {
    if (!initialQuestions) {
      fetchQuestions();
    }

    // Cleanup: Abort ongoing request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const { filters, filteredQuestions, actions } = useTableFilters({
    questions,
  });

  const handleView = (id: string) => {
    console.log("Viser spørsmål:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Redigerer spørsmål:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Sletter spørsmål:", id);
  };

  // Retry handler that uses the same AbortController logic
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchQuestions();
  };

  if (isLoading) {
    return (
      <>
        {/* <button
          onClick={fetchQuestions}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          aria-describedby="retry-help"
          type="button"
        >
          Trigger igjen
        </button> */}
        <Loading />
      </>
    );
  }

  if (isError && error) {
    const errorMessage =
      retryCount > 0 ? `${error} (Forsøk ${retryCount + 1})` : error;
    return <ErrorState message={errorMessage} onRetry={handleRetry} />;
  }

  return (
    <div className="question-table-page">
      <header className="page-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>

      <TableFilters
        filters={filters}
        actions={actions}
        totalQuestions={questions.length}
        filteredCount={filteredQuestions.length}
      />

      <QuestionTable
        questions={filteredQuestions}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
