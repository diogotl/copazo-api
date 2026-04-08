export class ParticipantNotFoundError extends Error {
  constructor() {
    super("Participant not found in this pool.");
    this.name = "ParticipantNotFoundError";
  }
}
