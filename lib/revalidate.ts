/**
 * Refresh every cached public page after content changes in the admin.
 * Outside a Next.js request (migration script, Payload CLI) there is no cache
 * to refresh, so the call is skipped.
 */
export async function revalidateSite() {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    // Not running inside Next.js.
  }
}
