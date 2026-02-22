export class CliError extends Error {
  readonly exitCode: number;

  constructor(message: string, exitCode: number = 1) {
    super(message);
    this.name = "CliError";
    this.exitCode = exitCode;
  }
}

export class NetworkError extends CliError {
  constructor(message: string) {
    super(message, 1);
    this.name = "NetworkError";
  }
}

export class ConflictError extends CliError {
  constructor(message: string) {
    super(message, 1);
    this.name = "ConflictError";
  }
}

export class NotFoundError extends CliError {
  constructor(message: string) {
    super(message, 1);
    this.name = "NotFoundError";
  }
}
