export class JokerAlreadyUsedError extends Error {
  constructor() {
    super("You have already used your joker for this round");
    this.name = "JokerAlreadyUsedError";
  }
}
