import type { GamesRepository } from "@/repositories/games-repository";
import Redis from "ioredis";

interface ListGamesUseCaseRequest {
  phase?: string;
  group?: string;
  teamId?: string;
  upcoming?: boolean;
  limit?: number;
}

export class ListGamesUseCase {
  private redis: Redis;
  private readonly CACHE_KEY = "games:all";
  private readonly TTL = 60 * 60 * 24; // 24 hours

  constructor(
    private gamesRepository: GamesRepository,
    redis?: Redis,
  ) {
    this.redis =
      redis ||
      new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        lazyConnect: true,
      });
  }

  async execute({
    phase,
    group,
    teamId,
    upcoming,
    limit = 20,
  }: ListGamesUseCaseRequest) {
    try {
      // Try Redis first
      const cached = await this.redis.get(this.CACHE_KEY);
      let games: any[];

      if (cached) {
        console.log("🚀 Redis HIT: games");
        games = JSON.parse(cached);
      } else {
        console.log("💽 Redis MISS: loading games...");
        games = await this.gamesRepository.findManyWithTeams({ limit: 200 });

        // Cache for 24h
        await this.redis.setex(this.CACHE_KEY, this.TTL, JSON.stringify(games));
        console.log(`✅ Cached ${games.length} games`);
      }

      // Filter in memory
      let filtered = games;

      if (phase) {
        filtered = filtered.filter((g: any) => g.phase === phase);
      }

      if (group) {
        filtered = filtered.filter((g: any) => g.group === group);
      }

      if (teamId) {
        filtered = filtered.filter(
          (g: any) => g.firstTeam.id === teamId || g.secondTeam.id === teamId,
        );
      }

      if (upcoming) {
        const now = new Date();
        filtered = filtered.filter((g: any) => new Date(g.date) > now);
      }

      // Sort and limit
      filtered.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      filtered = filtered.slice(0, limit);

      return { games: filtered };
    } catch (redisError) {
      console.warn("Redis failed, using fallback:", redisError);
      // Fallback to direct DB
      const games = await this.gamesRepository.findManyWithTeams({
        phase,
        group,
        teamId,
        upcoming,
        limit,
      });
      return { games };
    }
  }
}
