export class PoolNotFoundError extends Error {
  constructor() {
    super("Pool not found.");
    this.name = "PoolNotFoundError";
  }
}
