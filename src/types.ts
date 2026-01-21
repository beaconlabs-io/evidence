import { z } from "zod";

// =============================================================================
// CORE CONSTANTS
// =============================================================================

export const STRENGTH_LEVELS = ["0", "1", "2", "3", "4", "5"] as const;
export type StrengthLevel = (typeof STRENGTH_LEVELS)[number];

export const OUTCOME_EFFECTS = ["N/A", "+", "-", "+-", "!"] as const;
export type OutcomeEffect = (typeof OUTCOME_EFFECTS)[number];

// =============================================================================
// CORE SCHEMAS
// =============================================================================

export const EvidenceResultSchema = z.object({
  intervention: z.string(),
  outcome_variable: z.string(),
  outcome: z.enum(OUTCOME_EFFECTS, {
    message: "Outcome must be one of: N/A, +, -, +-, !",
  }),
});

export type EvidenceResult = z.infer<typeof EvidenceResultSchema>;

export const EvidenceCitationSchema = z.object({
  name: z.string().min(1, "Citation name is required"),
  type: z.string().optional(),
  src: z.string().optional(),
});

export type EvidenceCitation = z.infer<typeof EvidenceCitationSchema>;

export const EvidenceFrontmatterSchema = z.object({
  evidence_id: z.string().min(1, "Evidence ID is required"),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  citation: z
    .array(EvidenceCitationSchema)
    .min(1, "At least one citation is required"),
  results: z
    .array(EvidenceResultSchema)
    .min(1, "At least one result is required"),
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

export type EvidenceFrontmatter = z.infer<typeof EvidenceFrontmatterSchema>;

// =============================================================================
// DEPLOYMENT METADATA SCHEMA
// =============================================================================

export const EvidenceDeploymentHistorySchema = z.object({
  ipfsHash: z.string(),
  attestationUID: z.custom<`0x${string}`>(
    (val) => typeof val === "string" && val.startsWith("0x"),
    { message: "Attestation UID must be a hex string starting with 0x" }
  ),
  timestamp: z.string(),
  size: z.number(),
});

export type EvidenceDeploymentHistory = z.infer<
  typeof EvidenceDeploymentHistorySchema
>;

export const EvidenceDeploymentSchema = z.object({
  evidenceId: z.string(),
  ipfsHash: z.string(),
  attestationUID: z.custom<`0x${string}`>(
    (val) => typeof val === "string" && val.startsWith("0x"),
    { message: "Attestation UID must be a hex string starting with 0x" }
  ),
  timestamp: z.string(),
  size: z.number(),
  updatedAt: z.string().optional(),
  history: z.array(EvidenceDeploymentHistorySchema).optional(),
});

export type EvidenceDeployment = z.infer<typeof EvidenceDeploymentSchema>;

// =============================================================================
// COMBINED EVIDENCE TYPE (frontmatter + deployment)
// =============================================================================

export const EvidenceSchema = EvidenceFrontmatterSchema.extend({
  attestationUID: z
    .custom<`0x${string}`>(
      (val) => typeof val === "string" && val.startsWith("0x")
    )
    .optional(),
  ipfsHash: z.string().optional(),
  timestamp: z.string().optional(),
  history: z.array(EvidenceDeploymentHistorySchema).optional(),
});

export type Evidence = z.infer<typeof EvidenceSchema>;

// =============================================================================
// BUNDLED EVIDENCE TYPE (for npm package content)
// =============================================================================

export interface BundledEvidence {
  frontmatter: EvidenceFrontmatter;
  content: string;
  raw: string;
}
