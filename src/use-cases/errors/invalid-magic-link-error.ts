export class InvalidMagicLinkError extends Error {
  constructor() {
    super("Magic link is invalid or has expired.");
    this.name = "InvalidMagicLinkError";
  }
}
