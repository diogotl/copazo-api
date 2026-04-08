export class AlreadyInPoolError extends Error {
  constructor() {
    super("You are already in this pool.");
    this.name = "AlreadyInPoolError";
  }
}
