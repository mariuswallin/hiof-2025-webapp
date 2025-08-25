// __tests__/useTableFilters.test.ts

import { it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTableFilters } from "../hooks/useTableFilters";

it("should filter questions by search term", () => {
  const { result } = renderHook(() => useTableFilters());

  act(() => {
    result.current.actions.setSearchTerm("React");
  });

  expect(result.current.filteredQuestions).toHaveLength(1);
  expect(result.current.filteredQuestions[0].question).toBe("React spørsmål");
});
