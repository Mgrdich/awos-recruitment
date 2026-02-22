---
description: Verifies spec completion — checks acceptance criteria, marks Status as Completed.
---

Use `AskUserQuestion` tool for multiple-choice questions instead of plain text or numbered lists.

After verification passes, update project documentation as needed:

- **README.md** — User-facing only. Update when new MCP tools are added, connection instructions change, or the quick start flow changes. Do NOT add development details here.
- **docs/DEVELOPMENT.md** — Development guide. Update when prerequisites change (new tools, version bumps), new `just` tasks are added, project structure changes (new directories, moved files), or the AWOS workflow evolves.
- **docs/CONTRIBUTING.md** — Registry contributor guide. Update when registry schemas change (new required/optional fields), validation rules change, directory structure changes, or new capability types are added.

Only update docs that are actually affected by the completed spec. Skip docs that have no relevant changes.

Refer to the instructions located in this file: .awos/commands/verify.md
