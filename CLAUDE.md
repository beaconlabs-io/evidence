# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Evidence Repository** for Beacon Labs - a collection of structured research evidence stored in MDX format. Evidence files are uploaded to IPFS (via Pinata) and attested on-chain using the Ethereum Attestation Service (EAS) on Base Sepolia.

## Repository Structure

```
evidence/         # MDX evidence files (e.g., 00.mdx, 01.mdx)
deployments/      # JSON deployment records with IPFS hashes and attestation UIDs
.github/
  scripts/        # Automation scripts for GitHub Actions
    comment.js    # PR comment helper (update or create)
    eas.js        # EAS attestation creation (Base Sepolia)
    pinata.js     # IPFS upload via Pinata
    validate-evidence.ts  # Zod-based evidence validation
  workflows/
    evidence-validation.yml   # PR validation on `dev` branch
    evidence-attestation.yml  # Attestation via `/attest` command
```

## Evidence File Format

Evidence files are MDX with YAML frontmatter. Required fields:
- `evidence_id`: Unique identifier (e.g., "00")
- `title`: Research title
- `results`: Array of intervention outcomes
- `strength`: Evidence strength rating
- `methodologies`: Array of research methodologies
- `version`: Semantic version
- `datasets`: Array of dataset descriptions
- `citation`: Array of citation objects with `type`, `name`, `src`
- `date`: Publication date
- `author`: Author name
- `tags`: Array of categorization tags

## Development Commands

```bash
# Install dependencies (uses Bun)
bun install

# Run evidence validation locally
BASE_BRANCH=dev bun run .github/scripts/validate-evidence.ts
```

## CI/CD Workflow

1. **Evidence Validation** - Runs automatically on PRs targeting `dev` that modify `contents/evidence/*.mdx`
2. **Evidence Attestation** - Triggered by `/attest` comment on approved PRs (requires write permission)
   - Uploads evidence content to IPFS via Pinata
   - Creates EAS attestation on Base Sepolia
   - Updates deployment JSON with new attestation UID and IPFS hash
   - Commits deployment file back to PR branch

## Key Technical Details

- **EAS Contract**: `0x4200000000000000000000000000000000000021` (Base Sepolia)
- **Schema UID**: `0xaec128d2b0ed11303f1d7ca6c0a7387607b61f1181c36b378022b4fda73df68f`
- **Runtime**: Bun + Node.js 22.x
- **Validation**: Zod schema via `EvidenceFrontmatterSchema` (imported from `types/index.ts`)

## Required Secrets (GitHub Actions)

- `PINATA_JWT` - Pinata API token for IPFS uploads
- `PRIVATE_KEY` - Ethereum wallet private key for EAS attestations
