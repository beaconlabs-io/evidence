---
"@beaconlabs-io/evidence": patch
---

Enforce field length limits in evidence frontmatter schema

- Added max character constraints to Zod schema:
  - `title`: 200 chars
  - `author`: 100 chars
  - `intervention`: 80 chars
  - `outcome_variable`: 50 chars
- Updated all evidence files to comply with new limits
- Fixed author attribution to use actual paper authors
- Replaced temporary SSRN download URL with permanent abstract URL
