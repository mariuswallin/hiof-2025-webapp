// app/hooks/useTableFilters.ts

import { useState } from "react";

import type { TableFilters, FilterActions } from "@/app/types/filters";

const DEFAULT_FILTERS: TableFilters = {
  search: "",
  status: "all",
};

// TODO: Set filters in url or local storage. Expand hook to support both [local state, local storage, url params]

export function useTableFilters() {
  const [filters, setFilters] = useState<TableFilters>(DEFAULT_FILTERS);

  const setSearch = (search: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search,
    }));
  };

  const setStatus = (status: TableFilters["status"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      status,
    }));
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Group actions together for better organization
  const actions: FilterActions = {
    setSearch,
    setStatus,
    clearAllFilters,
  };

  return {
    filters,
    actions,
  };
}
