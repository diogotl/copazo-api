export class GuessNotFoundError extends Error {
  constructor() {
    super("Guess not found for this game in this pool.");
    this.name = "GuessNotFoundError";
  }
}
