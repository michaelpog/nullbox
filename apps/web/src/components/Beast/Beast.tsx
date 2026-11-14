import type { BeastMood } from "../../api/generated/BeastMood";
import { useCopy } from "../../copy/CopyProvider";
import styles from "./Beast.module.css";
import { HandymanBeast } from "./HandymanBeast";

/** The Handyman Beast. Its mood is computed by the backend (`nullbox_domain::BeastMood`). */
export function Beast({ mood }: { mood: BeastMood }) {
  const copy = useCopy();
  return (
    <figure className={`${styles.beast} ${styles[mood]}`} data-mood={mood}>
      <HandymanBeast mood={mood} label={copy.beast.labels[mood]} />
      <figcaption className={styles.caption}>{copy.beast.moods[mood]}</figcaption>
    </figure>
  );
}
