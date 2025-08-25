// src/app/lib/schema/questions/dtos.ts

import { z } from "zod";

// API Response DTO schemas som utvider våre eksisterende schemas
export const QuestionDTOSchema = z.object({
  id: z.string(),
  question: z.string(),
  createdAt: z.string(),
  answersCount: z.number().int().min(0),
  status: z.enum(["draft", "published", "archived", "deleted"]),
  authorId: z.coerce.number().optional(),
});

export const QuestionDetailDTOSchema = QuestionDTOSchema.extend({
  answers: z.array(
    z.object({
      id: z.string(),
      answer: z.string(),
      createdAt: z.string(),
    })
  ),
});

// Input DTO for API requests - builds on our existing CreateSchema
export const CreateQuestionDTOSchema = z.object({
  question: z.string().min(1).max(500),
  status: z.enum(["draft", "published"]).default("draft"),
  // metadata: z.record(z.unknown()).optional(), // Flexible metadata as JSON (not applicable for us)
  authorId: z.coerce.number().optional(), // Optional author ID, can be set by the API
  answers: z
    .array(
      z.object({
        answer: z.string().min(1),
      })
    )
    .min(2, "Minimum 2 svar kreves"),
});

// API Response wrapper som bruker vårt eksisterende response pattern
export const ApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
  pagination: z
    .object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number(),
      hasNextPage: z.boolean(),
      hasPreviousPage: z.boolean(),
    })
    .optional(),
});

// TypeScript types fra Zod schemas
export type QuestionDTO = z.infer<typeof QuestionDTOSchema>;
export type QuestionDetailDTO = z.infer<typeof QuestionDetailDTOSchema>;
export type CreateQuestionDTO = z.infer<typeof CreateQuestionDTOSchema>;
export type ApiResponse<T> = z.infer<typeof ApiResponseSchema> & {
  data: T;
};
