# Registry

Git-managed catalog of skills, agents, and tools with structured metadata. This is the source of truth for all capabilities discoverable through the AWOS Recruitment MCP server.

## Purpose

The registry contains the actual capability definitions — each skill, agent, or tool is stored as a structured entry with metadata (name, description, tags, stack compatibility, maturity level, author). The MCP server indexes this registry at build time to power search and discovery.

## Status

Not yet implemented. This sub-project will be built in Phase 1 of the roadmap (Capability Registry & Indexing).

## Planned Structure

Each capability entry will include:

| Field | Type | Description |
|---|---|---|
| `name` | string | Unique capability name |
| `description` | string | What the capability does |
| `tags` | list | Associated tags for categorization |
| `stack` | list | Compatible technology stacks (e.g., react, python, kubernetes) |
| `maturity` | string | Maturity level (experimental, stable, production) |
| `author` | string | Capability author |

## Integration

- The MCP server (`server/`) reads from this registry
- Metadata schema validation ensures consistency across all entries
- Updates to the registry trigger re-indexing as part of the CI/CD build process

## References

- Product roadmap: `context/product/roadmap.md` (Phase 1: Capability Registry & Indexing)
- Architecture: `context/product/architecture.md` (Capability Source of Truth: Git-managed repository)
