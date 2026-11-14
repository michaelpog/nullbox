import type { Category } from "../api/generated/Category";

/**
 * TEST flat rates in yen, one per item in `copy.rates[category]`.
 * Placeholder values until real prices are set (and moved to the backend).
 * The UI labels them as TEST prices.
 */
export const TEST_RATES: Record<Category, number[]> = {
  plumbing: [8000, 6000, 9000, 7000],
  electrical: [6000, 7000, 8000],
  gas: [9000, 7000, 10000],
  air_conditioning: [12000, 6000, 20000],
  moving: [15000, 9000, 6000],
};
