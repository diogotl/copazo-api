import type { Game } from "@/drizzle/schema/games";

export interface GameWithTeams {
  id: string;
  date: Date;
  phase: string;
  group: string | null;
  createdAt: Date | null;
  firstTeam: {
    id: string;
    name: string;
    countryCode: string;
    fifaCode: string;
    confederation: string;
    flagUrl: string | null;
  };
  secondTeam: {
    id: string;
    name: string;
    countryCode: string;
    fifaCode: string;
    confederation: string;
    flagUrl: string | null;
  };
  stadium: {
    id: string;
    name: string;
    city: string;
    countryCode: string;
    capacity: number;
  } | null;
}

export interface FindGamesFilters {
  phase?: string;
  group?: string;
  teamId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  upcoming?: boolean;
  limit?: number;
  offset?: number;
}

export interface GamesRepository {
  findById(id: string): Promise<Game | null>;
  findByIdWithTeams(id: string): Promise<GameWithTeams | null>;
  findMany(filters?: FindGamesFilters): Promise<Game[]>;
  findManyWithTeams(filters?: FindGamesFilters): Promise<GameWithTeams[]>;
  findByPhase(phase: string): Promise<Game[]>;
  findByTeam(teamId: string): Promise<Game[]>;
  findByGroup(group: string): Promise<Game[]>;
  findUpcoming(limit?: number): Promise<Game[]>;
  findToday(): Promise<Game[]>;
  findByDateRange(from: Date, to: Date): Promise<Game[]>;
  getPhases(): Promise<string[]>;
  getGroups(): Promise<string[]>;
}
