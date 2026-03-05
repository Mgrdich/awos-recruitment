import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import { resolveServerUrl } from "../server-url.js";

const tempDirs: string[] = [];

function makeTempDir(prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

describe("resolveServerUrl", () => {
  const originalEnv = process.env.AWOS_SERVER_URL;

  beforeEach(() => {
    delete process.env.AWOS_SERVER_URL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalEnv !== undefined) {
      process.env.AWOS_SERVER_URL = originalEnv;
    } else {
      delete process.env.AWOS_SERVER_URL;
    }
    for (const dir of tempDirs) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch {
        // best-effort
      }
    }
    tempDirs.length = 0;
  });

  it("returns AWOS_SERVER_URL env var when set", () => {
    process.env.AWOS_SERVER_URL = "http://custom:1234";
    expect(resolveServerUrl()).toBe("http://custom:1234");
  });

  it("reads URL from .mcp.json and strips /mcp suffix", () => {
    const fakeCwd = makeTempDir("url-cwd-");
    vi.spyOn(process, "cwd").mockReturnValue(fakeCwd);

    const mcpJson = {
      mcpServers: {
        "awos-recruitment": {
          type: "url",
          url: "https://recruitment.awos.provectus.pro/mcp",
        },
      },
    };
    fs.writeFileSync(
      path.join(fakeCwd, ".mcp.json"),
      JSON.stringify(mcpJson),
      "utf-8",
    );

    expect(resolveServerUrl()).toBe(
      "https://recruitment.awos.provectus.pro",
    );
  });

  it("returns default production URL when no env var and no .mcp.json", () => {
    const fakeCwd = makeTempDir("url-cwd-");
    vi.spyOn(process, "cwd").mockReturnValue(fakeCwd);

    expect(resolveServerUrl()).toBe(
      "https://recruitment.awos.provectus.pro",
    );
  });

  it("returns default when .mcp.json exists but has no awos-recruitment entry", () => {
    const fakeCwd = makeTempDir("url-cwd-");
    vi.spyOn(process, "cwd").mockReturnValue(fakeCwd);

    fs.writeFileSync(
      path.join(fakeCwd, ".mcp.json"),
      JSON.stringify({ mcpServers: { other: { url: "http://other" } } }),
      "utf-8",
    );

    expect(resolveServerUrl()).toBe(
      "https://recruitment.awos.provectus.pro",
    );
  });

  it("returns default when .mcp.json is malformed", () => {
    const fakeCwd = makeTempDir("url-cwd-");
    vi.spyOn(process, "cwd").mockReturnValue(fakeCwd);

    fs.writeFileSync(
      path.join(fakeCwd, ".mcp.json"),
      "not valid json {{{",
      "utf-8",
    );

    expect(resolveServerUrl()).toBe(
      "https://recruitment.awos.provectus.pro",
    );
  });

  it("env var takes priority over .mcp.json", () => {
    process.env.AWOS_SERVER_URL = "http://env-override:5555";

    const fakeCwd = makeTempDir("url-cwd-");
    vi.spyOn(process, "cwd").mockReturnValue(fakeCwd);

    const mcpJson = {
      mcpServers: {
        "awos-recruitment": {
          url: "https://recruitment.awos.provectus.pro/mcp",
        },
      },
    };
    fs.writeFileSync(
      path.join(fakeCwd, ".mcp.json"),
      JSON.stringify(mcpJson),
      "utf-8",
    );

    expect(resolveServerUrl()).toBe("http://env-override:5555");
  });
});
