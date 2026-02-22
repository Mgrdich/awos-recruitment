export interface InstallResult {
  name: string;
  status: "installed" | "not-found" | "conflict" | "error";
  message: string;
}

export interface McpServerConfig {
  [key: string]: unknown;
}

export interface McpYamlShape {
  name: string;
  description: string;
  config: Record<string, McpServerConfig>;
}
