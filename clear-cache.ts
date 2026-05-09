import Redis from "ioredis";

async function clearCache() {
  const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    lazyConnect: true,
  });

  try {
    console.log("🧹 Clearing Redis cache...");

    // Clear the games cache
    const result = await redis.del("games:all");

    if (result === 1) {
      console.log("✅ Games cache cleared successfully");
    } else {
      console.log("ℹ️  No games cache found (probably already empty)");
    }

    // Optional: clear all cache keys if needed
    // Uncomment the lines below if you want to clear ALL cache
    // console.log("🧹 Clearing ALL cache keys...");
    // await redis.flushdb();
    // console.log("✅ All cache cleared");

    await redis.quit();
    console.log("👋 Redis connection closed");

  } catch (error) {
    console.error("❌ Error clearing cache:", error);
    process.exit(1);
  }
}

clearCache()
  .then(() => {
    console.log("🎉 Cache clearing completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
