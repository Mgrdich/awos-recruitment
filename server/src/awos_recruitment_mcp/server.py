"""FastMCP server instance for AWOS Recruitment.

This module instantiates the `FastMCP` server with project-level metadata.
Import `mcp` from here whenever you need to register tools, resources,
or prompts.
"""

from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastmcp import FastMCP
from starlette.requests import Request
from starlette.responses import JSONResponse

from awos_recruitment_mcp.config import Config
from awos_recruitment_mcp.registry import load_registry
from awos_recruitment_mcp.search_index import build_index

config = Config.from_env()


@asynccontextmanager
async def lifespan(server: FastMCP) -> AsyncIterator[dict]:
    """Initialise the capability search index on server startup.

    Loads every capability from the on-disk registry and builds an
    in-memory ChromaDB collection that tools can query throughout the
    server's lifetime.  The collection is exposed to tools via
    ``ctx.lifespan_context["collection"]``.
    """
    capabilities = load_registry(config.registry_path)
    collection = build_index(capabilities, config.embedding_model)

    yield {"collection": collection}


mcp = FastMCP(
    name="AWOS Recruitment",
    version=config.version,
    instructions=(
        "This server provides AI coding assistants with a discovery engine "
        "for skills, agents, and tools. Use the search_capabilities tool to "
        "find capabilities matching a natural language query."
    ),
    lifespan=lifespan,
)


@mcp.custom_route("/health", methods=["GET"])
async def health_check(request: Request) -> JSONResponse:
    """Return server health status and version."""
    return JSONResponse({"status": "ok", "version": config.version}, status_code=200)


# Import tool modules AFTER `mcp` is created so they can reference it without
# triggering a circular-import error.
import awos_recruitment_mcp.tools.search  # noqa: E402, F401 — registers MCP tools
