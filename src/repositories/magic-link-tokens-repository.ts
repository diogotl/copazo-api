export interface MagicLinkTokensRepository {
  save(token: string, email: string, ttlSeconds: number): Promise<void>;
  findEmailByToken(token: string): Promise<string | null>;
  delete(token: string): Promise<void>;
}
