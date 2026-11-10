import { cacheLife } from "next/cache";

/**
 * Renders the current year. `new Date()` is non-deterministic, so with Cache
 * Components it must live inside a cached scope - the year is refreshed daily.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
