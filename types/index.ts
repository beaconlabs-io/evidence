import { z } from "zod";
export const STRENGTH_LEVELS = ["0", "1", "2", "3", "4", "5"] as const;
export type StrengthLevel = (typeof STRENGTH_LEVELS)[number];
export const OUTCOME_EFFECTS = ["N/A", "+", "-", "+-", "!"] as const;
export type OutcomeEffect = (typeof OUTCOME_EFFECTS)[number];

export const EvidenceResultSchema = z.object({
  intervention: z.string(),
  outcome_variable: z.string(),
  outcome: z.enum(OUTCOME_EFFECTS, {
    message: "Outcome must be one of: N/A, +, -, +-, !",
  }),
});
export const EvidenceCitationSchema = z.object({
  name: z.string().min(1, "Citation name is required"),
  type: z.string().optional(),
  src: z.string().optional(),
});

export const EvidenceFrontmatterSchema = z.object({
  evidence_id: z.string().min(1, "Evidence ID is required"),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  citation: z.array(EvidenceCitationSchema).min(1, "At least one citation is required"),
  results: z.array(EvidenceResultSchema).min(1, "At least one result is required"),
  strength: z.enum(STRENGTH_LEVELS, {
    message: "Strength must be a level from 0 to 5 (SMS scale)",
  }),
  methodologies: z.union([z.string(), z.array(z.string())]),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in semver format")
    .optional(),
  datasets: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});