import type { BeastMood } from "../../api/generated/BeastMood";
import styles from "./Beast.module.css";

/** Face and pose per mood. Colors live in tokens.css (--beast-*). */
const POSES = {
  asleep: {
    brows: "M106 99 Q116 93 126 99 M134 99 Q144 93 154 99",
    mouth: "M116 140 Q130 154 144 140",
    hammer: "rotate(22 194 124)",
  },
  peckish: {
    brows: "M106 100 L126 100 M134 100 L154 100",
    mouth: "M118 144 L142 144",
    hammer: "rotate(0 194 124)",
  },
  grumpy: {
    brows: "M106 97 L126 103 M134 103 L154 97",
    mouth: "M118 148 Q130 140 142 148",
    hammer: "rotate(-28 194 124)",
  },
  kaiju: {
    brows: "M104 93 L127 105 M133 105 L156 93",
    mouth: "M114 152 Q130 134 146 152 Z",
    hammer: "rotate(-55 194 124)",
  },
} satisfies Record<BeastMood, { brows: string; mouth: string; hammer: string }>;

/** The Handyman Beast: one drawing, four moods (sparkles, steam, blush and vein toggle in CSS). */
export function HandymanBeast({ mood, label }: { mood: BeastMood; label: string }) {
  const pose = POSES[mood];
  return (
    <svg
      viewBox="0 0 230 190"
      className={`${styles.svg} ${styles[mood]}`}
      role="img"
      aria-label={label}
    >
      <ellipse cx="118" cy="178" rx="96" ry="8" className={styles.shadow} />
      <g className={styles.steam}>
        <path d="M78 54 q-8 -10 0 -20 q8 -10 0 -20" />
        <path d="M170 54 q-8 -10 0 -20 q8 -10 0 -20" />
      </g>
      <g className={styles.sparkle}>
        <path d="M196 36 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" />
        <path d="M58 40 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" />
      </g>
      <path d="M64 132 L76 108" className={styles.wrench} />
      <circle cx="78" cy="104" r="6" className={styles.wrenchHead} />
      <rect x="14" y="136" width="66" height="40" rx="5" className={styles.box} />
      <rect x="10" y="128" width="74" height="13" rx="4" className={styles.boxLid} />
      <path d="M35 128 v-10 h24 v10" className={styles.handle} />
      <rect x="42" y="144" width="10" height="9" rx="2" className={styles.latch} />
      <g className={styles.creature}>
        <path d="M88 176 C80 120 92 76 130 76 C168 76 180 120 172 176 Z" className={styles.body} />
        <path d="M98 84 C100 52 160 52 162 84 Z" className={styles.helmet} />
        <rect x="90" y="80" width="80" height="10" rx="5" className={styles.helmetBrim} />
        <path d="M130 58 v20" className={styles.ink} />
        <path d="M158 98 q5 -5 10 0 M163 93 q5 5 0 10" className={styles.vein} />
        <circle cx="116" cy="114" r="9" className={styles.eye} />
        <circle cx="144" cy="114" r="9" className={styles.eye} />
        <circle cx="117" cy="116" r="4" className={styles.pupil} />
        <circle cx="143" cy="116" r="4" className={styles.pupil} />
        <path d={pose.brows} className={styles.brow} />
        <circle cx="104" cy="132" r="6" className={styles.blush} />
        <circle cx="156" cy="132" r="6" className={styles.blush} />
        <path d={pose.mouth} className={styles.mouth} />
        <path d="M170 140 Q186 136 194 124" className={styles.brow} />
        <g transform={pose.hammer} className={styles.hammer}>
          <rect x="190" y="80" width="8" height="50" rx="3" className={styles.hammerHandle} />
          <rect x="176" y="70" width="36" height="16" rx="3" className={styles.hammerHead} />
        </g>
        <circle cx="194" cy="124" r="7" className={styles.body} />
      </g>
    </svg>
  );
}
