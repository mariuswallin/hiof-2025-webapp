"use client";

import { getQueryClient } from "./query-client";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

export default function Providers({
  children,
  dehydratedState,
}: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
