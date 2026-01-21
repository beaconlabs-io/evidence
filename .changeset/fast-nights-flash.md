---
"@beaconlabs-io/evidence": patch
---

fix(ci): enable GitHub Releases creation and prevent duplicate workflow runs

- Change publish command from `npm publish` to `bunx changeset publish` to enable automatic GitHub Releases creation
- Add `cancel-in-progress: true` to concurrency settings to prevent duplicate workflow executions
