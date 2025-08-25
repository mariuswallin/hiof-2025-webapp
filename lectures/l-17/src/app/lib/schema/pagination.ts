// app/lib/schema/pagination.ts

import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(500).default(100),
});
