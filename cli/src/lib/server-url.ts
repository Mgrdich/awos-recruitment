import * as fs from "node:fs";
import * as path from "node:path";

const DEFAULT_SERVER_URL = "https://recruitment.awos.provectus.pro";
const MCP_SERVER_KEY = "awos-recruitment";

/**
 * Resolves the AWOS server base URL using the following priority:
 *
 * 1. `AWOS_SERVER_URL` environment variable (explicit override)
 * 2. `awos-recruitment` entry in `.mcp.json` (strip `/mcp` suffix)
 * 3. Default production URL
 */
export function resolveServerUrl(): string {
  if (process.env.AWOS_SERVER_URL) {
    return process.env.AWOS_SERVER_URL;
  }

  const mcpJsonPath = path.join(process.cwd(), ".mcp.json");
  if (fs.existsSync(mcpJsonPath)) {
    try {
      const raw = fs.readFileSync(mcpJsonPath, "utf-8");
      const parsed = JSON.parse(raw) as {
        mcpServers?: Record<string, { url?: string }>;
      };
      const url = parsed.mcpServers?.[MCP_SERVER_KEY]?.url;
      if (url) {
        return url.replace(/\/mcp$/, "");
      }
    } catch {
      // Malformed .mcp.json — fall through to default.
    }
  }

  return DEFAULT_SERVER_URL;
}
