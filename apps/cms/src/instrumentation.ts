export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@repo/database/scheduler/publish");
  }
}
