import type { Category } from "../api/generated/Category";

const PATHS: Record<Category, string[]> = {
  plumbing: ["M12 3c0 0-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12z"],
  electrical: ["M13 2L4 14h7l-1 8 9-12h-7z"],
  gas: ["M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4 3 7 7 7z"],
  air_conditioning: ["M12 2v20M4 7l16 10M20 7L4 17"],
  moving: ["M3 7l9-4 9 4v10l-9 4-9-4z", "M3 7l9 4 9-4M12 11v10"],
};

/** Decorative: the category name is always written next to it. */
export function CategoryIcon({ category, size = 30 }: { category: Category; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[category].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
