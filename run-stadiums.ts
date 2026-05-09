import { seedGroupStageGames } from "./games";
import { seedStadiums } from "./stadiums";

async function main() {
  await seedGroupStageGames();
  console.log("✅ jogos seeded");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
