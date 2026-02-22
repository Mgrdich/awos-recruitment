# CLI (npx package)

TypeScript npx package for installing discovered capabilities from the AWOS Recruitment server. Enables one-command installation of skills, agents, and tools directly from search results.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Distribution:** npx (published to npm)

## Status

Not yet implemented. This sub-project will be built in Phase 2 of the roadmap (Capability Installation).

## Planned Functionality

- Accept a capability identifier from MCP search results
- Download and install the capability into the user's local Claude Code environment
- Support the full client-initiated discovery loop: search -> select -> install

## References

- Product roadmap: `context/product/roadmap.md` (Phase 2: Capability Installation)
- Architecture: `context/product/architecture.md` (CLI / Install Package: TypeScript npx)
