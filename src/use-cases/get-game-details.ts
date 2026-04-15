import type { GamesRepository } from "@/repositories/games-repository";
import { GameNotFoundError } from "./errors/game-not-found-error";

interface GetGameDetailsUseCaseRequest {
  gameId: string;
}

interface GetGameDetailsUseCaseResponse {
  game: {
    id: string;
    date: Date;
    phase: string;
    group: string | null;
    firstTeam: {
      id: string;
      name: string;
      countryCode: string;
      fifaCode: string;
      flagUrl: string | null;
    };
    secondTeam: {
      id: string;
      name: string;
      countryCode: string;
      fifaCode: string;
      flagUrl: string | null;
    };
    stadium?: {
      id: string;
      name: string;
      city: string;
      countryCode: string;
      capacity: number;
    } | null;
  };
}

export class GetGameDetailsUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute({
    gameId,
  }: GetGameDetailsUseCaseRequest): Promise<GetGameDetailsUseCaseResponse> {
    const game = await this.gamesRepository.findByIdWithTeams(gameId);

    if (!game) {
      throw new GameNotFoundError();
    }

    return {
      game: {
        id: game.id,
        date: game.date,
        phase: game.phase,
        group: game.group,
        firstTeam: {
          id: game.firstTeam.id,
          name: game.firstTeam.name,
          countryCode: game.firstTeam.countryCode,
          fifaCode: game.firstTeam.fifaCode,
          flagUrl: game.firstTeam.flagUrl,
        },
        secondTeam: {
          id: game.secondTeam.id,
          name: game.secondTeam.name,
          countryCode: game.secondTeam.countryCode,
          fifaCode: game.secondTeam.fifaCode,
          flagUrl: game.secondTeam.flagUrl,
        },
        stadium: game.stadium
          ? {
              id: game.stadium.id,
              name: game.stadium.name,
              city: game.stadium.city,
              countryCode: game.stadium.countryCode,
              capacity: game.stadium.capacity,
            }
          : null,
      },
    };
  }
}
