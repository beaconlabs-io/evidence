# @beaconlabs-io/evidence

## 1.1.3

### Patch Changes

- [#10](https://github.com/beaconlabs-io/evidence/pull/10) [`c65f138`](https://github.com/beaconlabs-io/evidence/commit/c65f138dce4054ebfa8e45d99d6a5c642ad4bc50) Thanks [@tnkshuuhei](https://github.com/tnkshuuhei)! - Enforce field length limits in evidence frontmatter schema

  - Added max character constraints to Zod schema:
    - `title`: 200 chars
    - `author`: 100 chars
    - `intervention`: 80 chars
    - `outcome_variable`: 50 chars
  - Updated all evidence files to comply with new limits
  - Fixed author attribution to use actual paper authors
  - Replaced temporary SSRN download URL with permanent abstract URL

## 1.1.2

### Patch Changes

- [`64666bf`](https://github.com/beaconlabs-io/evidence/commit/64666bf42a4d33526b31e033805ca2c7a90fc2ab) Thanks [@tnkshuuhei](https://github.com/tnkshuuhei)! - fix(ci): enable GitHub Releases creation and prevent duplicate workflow runs

  - Change publish command from `npm publish` to `bunx changeset publish` to enable automatic GitHub Releases creation
  - Add `cancel-in-progress: true` to concurrency settings to prevent duplicate workflow executions

## 1.1.1

### Patch Changes

- [#7](https://github.com/beaconlabs-io/evidence/pull/7) [`a0afa03`](https://github.com/beaconlabs-io/evidence/commit/a0afa0390071423445ae8a2de485ed64e59cd076) Thanks [@tnkshuuhei](https://github.com/tnkshuuhei)! - Enable OIDC Trusted Publishing for npm releases

  - Switch to Node.js 24 for native OIDC support
  - Remove NPM_TOKEN requirement (uses GitHub OIDC
    authentication)
  - Add automatic GitHub Releases and tags on publish

## 1.1.0

### Minor Changes

- [#4](https://github.com/beaconlabs-io/evidence/pull/4) [`59371b9`](https://github.com/beaconlabs-io/evidence/commit/59371b9a9af0fbafa96fb8332cd321952cc9c73a) Thanks [@tnkshuuhei](https://github.com/tnkshuuhei)! - Initial release with types and bundled content
