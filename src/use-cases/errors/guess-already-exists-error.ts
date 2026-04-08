export class GuessAlreadyExistsError extends Error {
  constructor() {
    super("You have already made a guess for this game in this pool.");
  }
}
