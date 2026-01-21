---
"@beaconlabs-io/evidence": patch
---

Enable OIDC Trusted Publishing for npm releases

- Switch to Node.js 24 for native OIDC support
- Remove NPM_TOKEN requirement (uses GitHub OIDC  
  authentication)
- Add automatic GitHub Releases and tags on publish
