# MCP Server

AWOS Recruitment MCP server — provides AI coding assistants with a discovery engine for skills, agents, and tools via the Model Context Protocol.

## Tech Stack

- **Runtime:** Python 3.12
- **MCP Framework:** FastMCP (Streamable HTTP transport)
- **Data Validation:** Pydantic
- **Config:** Environment variables via python-dotenv
- **Build:** Hatchling with src/ layout
- **Package Name:** `awos_recruitment_mcp`

## Dev Workflow

All commands must be run from inside this `server/` directory.

```bash
# Install dependencies
uv sync

# Run tests
uv run pytest -v

# Start the server (default: http://0.0.0.0:8000)
uv run python -m awos_recruitment_mcp
```

## Configuration

| Env Variable | Default | Purpose |
|---|---|---|
| `AWOS_HOST` | `0.0.0.0` | Server bind address |
| `AWOS_PORT` | `8000` | Server port |
| `AWOS_VERSION` | `0.1.0` | Version in health check and MCP server info |

Copy `.env.example` to `.env` for local overrides.

## Endpoints

| Method | Path | Type | Purpose |
|---|---|---|---|
| POST | `/mcp` | MCP (Streamable HTTP) | MCP protocol endpoint (automatic) |
| GET | `/health` | HTTP | Health check — returns `{"status": "ok", "version": "..."}` |

## Project Structure

```
server/
├── src/awos_recruitment_mcp/
│   ├── __init__.py       # Package version
│   ├── __main__.py       # Entry point
│   ├── config.py         # Config from env vars
│   ├── server.py         # FastMCP instance, health check, tool imports
│   ├── models/
│   │   └── capability.py # CapabilityResult Pydantic model
│   └── tools/
│       └── search.py     # search_capabilities MCP tool
├── tests/
│   ├── conftest.py       # Shared fixtures (in-process MCP client)
│   ├── test_server.py    # MCP handshake tests
│   ├── test_health.py    # Health endpoint tests
│   └── test_search_tool.py # search_capabilities tests
├── pyproject.toml
├── .python-version
├── .env.example
└── uv.lock
```
