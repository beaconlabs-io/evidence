# @beaconlabs-io/evidence

[![npm version](https://img.shields.io/npm/v/@beaconlabs-io/evidence)](https://www.npmjs.com/package/@beaconlabs-io/evidence)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of structured research evidence with Zod schemas and TypeScript types for the Beacon Labs MUSE platform.

## Installation

```bash
npm install @beaconlabs-io/evidence
```

**Peer Dependencies:** This package requires `zod` v4.

## Usage

### Import Paths

The package provides three entry points:

| Entry Point                       | Description                  |
| --------------------------------- | ---------------------------- |
| `@beaconlabs-io/evidence`         | Everything (types + content) |
| `@beaconlabs-io/evidence/types`   | Types and Zod schemas only   |
| `@beaconlabs-io/evidence/content` | Content accessors only       |

### Types and Schemas

```typescript
import type {
  Evidence,
  EvidenceFrontmatter,
  EvidenceResult,
  EvidenceDeployment,
  StrengthLevel,
  OutcomeEffect,
} from "@beaconlabs-io/evidence/types";

import {
  EvidenceFrontmatterSchema,
  EvidenceResultSchema,
  EvidenceDeploymentSchema,
  STRENGTH_LEVELS,
  OUTCOME_EFFECTS,
} from "@beaconlabs-io/evidence/types";

// Validate evidence data
const result = EvidenceFrontmatterSchema.safeParse(data);
if (result.success) {
  console.log(result.data.title);
}
```

### Content Accessors

```typescript
import {
  getEvidence,
  getAllEvidence,
  getAllEvidenceMeta,
  getDeployment,
  getEvidenceWithDeployment,
  getAllEvidenceSlugs,
} from "@beaconlabs-io/evidence/content";

// Get single evidence by slug
const evidence = getEvidence("00");
// Returns: { frontmatter, content, raw }

// Get all evidence metadata (for lists)
const allMeta = getAllEvidenceMeta();
// Returns: EvidenceFrontmatter[]

// Get evidence with deployment info (attestation, IPFS hash)
const full = getEvidenceWithDeployment("00");
// Returns: Evidence (frontmatter + deployment merged)
```

### Using with MDX Compilers

The `raw` field contains the complete MDX file content, which can be passed directly to MDX compilers like `next-mdx-remote`:

```typescript
import { getEvidence } from "@beaconlabs-io/evidence/content";
import { compileMDX } from "next-mdx-remote/rsc";

const evidence = getEvidence("00");
if (evidence) {
  const { content } = await compileMDX({
    source: evidence.raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeSlug, rehypeKatex],
      },
    },
  });
}
```

## API Reference

### Types

| Type                  | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `Evidence`            | Complete evidence type (frontmatter + deployment metadata)           |
| `EvidenceFrontmatter` | MDX frontmatter fields                                               |
| `EvidenceResult`      | Intervention outcome (`{ intervention, outcome_variable, outcome }`) |
| `EvidenceCitation`    | Citation reference (`{ name, type?, src? }`)                         |
| `EvidenceDeployment`  | Deployment metadata (`{ attestationUID, ipfsHash, timestamp, ... }`) |
| `BundledEvidence`     | Bundled content (`{ frontmatter, content, raw }`)                    |
| `StrengthLevel`       | `"0" \| "1" \| "2" \| "3" \| "4" \| "5"` (SMS scale)                 |
| `OutcomeEffect`       | `"N/A" \| "+" \| "-" \| "+-" \| "!"`                                 |

### Zod Schemas

| Schema                      | Description                              |
| --------------------------- | ---------------------------------------- |
| `EvidenceFrontmatterSchema` | Validates MDX frontmatter                |
| `EvidenceResultSchema`      | Validates result objects                 |
| `EvidenceCitationSchema`    | Validates citation objects               |
| `EvidenceDeploymentSchema`  | Validates deployment metadata            |
| `EvidenceSchema`            | Full evidence (frontmatter + deployment) |

### Content Functions

| Function                          | Returns                           | Description                      |
| --------------------------------- | --------------------------------- | -------------------------------- |
| `getEvidence(slug)`               | `BundledEvidence \| undefined`    | Get evidence by slug             |
| `getDeployment(slug)`             | `EvidenceDeployment \| undefined` | Get deployment metadata          |
| `getEvidenceWithDeployment(slug)` | `Evidence \| undefined`           | Get merged evidence + deployment |
| `getAllEvidenceMeta()`            | `EvidenceFrontmatter[]`           | Get all frontmatter (sorted)     |
| `getAllEvidence()`                | `Evidence[]`                      | Get all evidence with deployment |
| `getAllEvidenceSlugs()`           | `readonly string[]`               | Get all available slugs          |

### Constants

| Constant          | Value                            |
| ----------------- | -------------------------------- |
| `STRENGTH_LEVELS` | `["0", "1", "2", "3", "4", "5"]` |
| `OUTCOME_EFFECTS` | `["N/A", "+", "-", "+-", "!"]`   |

## Evidence File Format

Evidence files are MDX with YAML frontmatter located in `evidence/*.mdx`:

```yaml
---
evidence_id: "00"
title: "Effect of X on Y"
author: "BeaconLabs"
date: "2024-01-01"
results:
  - intervention: "Description of intervention"
    outcome_variable: "What was measured"
    outcome: "+" # N/A, +, -, +-, !
strength: "3" # 0-5 (Maryland SMS scale)
methodologies:
  - "RCT"
version: "1.0.0"
citation:
  - name: "Paper Title"
    type: "link"
    src: "https://example.com/paper"
tags:
  - "education"
  - "health"
datasets:
  - "Dataset name"
---
## Key Points

- Finding 1
- Finding 2
## Background
```

### Outcome Effects

| Value | Meaning                                                      |
| ----- | ------------------------------------------------------------ |
| `N/A` | Unclear - insufficient sample size or inadequate methods     |
| `+`   | Positive - expected effect found (statistically significant) |
| `-`   | No effect - expected effect not observed                     |
| `+-`  | Mixed - heterogeneous effects depending on conditions        |
| `!`   | Side effects - unintended effects observed                   |

### Strength Levels (Maryland SMS Scale)

| Level | Description                            |
| ----- | -------------------------------------- |
| 0     | Non-experimental (mathematical models) |
| 1     | Correlation without control            |
| 2     | Before/after without control group     |
| 3     | Before/after with control group        |
| 4     | Quasi-experimental (matching, DiD)     |
| 5     | Randomized Controlled Trial (RCT)      |

## Development

### Build

```bash
npm install
npm run build
```

### Validate Evidence Files

```bash
npm run validate
```

### Project Structure

```
evidence/
├── src/
│   ├── index.ts           # Main entry point
│   ├── types.ts           # Zod schemas and TypeScript types (canonical)
│   └── content/
│       ├── index.ts       # Content accessor API
│       ├── evidence.ts    # Generated: bundled MDX content
│       └── deployments.ts # Generated: bundled deployment metadata
├── types/
│   └── index.ts           # Re-exports from src/types.ts (CI/CD compatibility)
├── scripts/
│   └── bundle-content.ts  # Build script (generates content/*.ts)
├── evidence/              # Source MDX files
├── deployments/           # Attestation metadata (JSON)
└── dist/                  # Build output
```

> **Note:** `types/index.ts` re-exports all types from `src/types.ts` for backward compatibility with CI/CD scripts. The canonical type definitions live in `src/types.ts`.

## Contributing

### Adding New Evidence

1. Create a new MDX file in `evidence/` (e.g., `evidence/21.mdx`)
2. Follow the frontmatter schema (see Evidence File Format above)
3. Submit a Pull Request
4. After review, use `/attest` comment to create blockchain attestation
5. Add a changeset: `npx changeset`
6. Merge PR to trigger npm publish

### Versioning

This package uses [Changesets](https://github.com/changesets/changesets) for version management.

## License

MIT
