export class GameAlreadyStartedError extends Error {
  constructor() {
    super("You can only make a guess before the game starts.");
  }
}
