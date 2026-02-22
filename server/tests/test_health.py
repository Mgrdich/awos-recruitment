import httpx
import pytest
from awos_recruitment_mcp.server import mcp


@pytest.fixture
def asgi_app():
    """Return the ASGI app from the FastMCP server for in-process HTTP testing."""
    return mcp.http_app()


async def test_health_returns_200(asgi_app):
    """GET /health must respond with HTTP 200."""
    transport = httpx.ASGITransport(app=asgi_app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")

    assert response.status_code == 200, (
        f"Expected HTTP 200, got {response.status_code}"
    )


async def test_health_response_body(asgi_app):
    """GET /health must return {\"status\": \"ok\", \"version\": \"0.1.0\"} as JSON."""
    transport = httpx.ASGITransport(app=asgi_app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")

    body = response.json()
    assert body.get("status") == "ok", (
        f"Expected status 'ok', got '{body.get('status')}'"
    )
    assert body.get("version") == "0.1.0", (
        f"Expected version '0.1.0', got '{body.get('version')}'"
    )
