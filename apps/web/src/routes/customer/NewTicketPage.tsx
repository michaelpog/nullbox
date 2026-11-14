import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import type { Category } from "../../api/generated/Category";
import type { PreferredTime } from "../../api/generated/PreferredTime";
import type { Severity } from "../../api/generated/Severity";
import { rememberMyTicket } from "../../api/myTickets";
import { useCreateTicket } from "../../api/queries";
import { CategoryIcon } from "../../components/CategoryIcon";
import { ErrorMessage } from "../../components/Feedback";
import { useCopy, useFormat } from "../../copy/CopyProvider";
import { TEST_RATES } from "../../data/testRates";
import pages from "../pages.module.css";
import styles from "./customer.module.css";

const CATEGORIES: Category[] = ["plumbing", "electrical", "gas", "air_conditioning", "moving"];
const SEVERITIES: Severity[] = ["p4", "p3", "p2", "p1"];
const TIMES: PreferredTime[] = [
  "weekday_morning",
  "weekday_afternoon",
  "weekday_evening",
  "weekend",
  "any_time",
];

/** "Report a problem": what broke, how bad, when to come. */
export function NewTicketPage() {
  const copy = useCopy();
  const format = useFormat();
  const navigate = useNavigate();
  const create = useCreateTicket();
  const [category, setCategory] = useState<Category>("plumbing");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (name: string) => String(form.get(name) ?? "").trim();
    create.mutate(
      {
        subject: text("subject"),
        body: text("body"),
        severity: text("severity") as Severity,
        category,
        preferred_time: text("preferred_time") as PreferredTime,
      },
      {
        onSuccess: (created) => {
          rememberMyTicket({
            id: created.ticket.id,
            token: created.access_token,
            number: created.ticket.number,
          });
          navigate("/tickets", { state: { created } });
        },
      },
    );
  };

  const categoryName = copy.category[category];
  return (
    <section className={pages.page}>
      <div className={styles.heading}>
        <h1>{copy.customer.title}</h1>
        <p>{copy.customer.intro}</p>
      </div>
      <div className={styles.split}>
        <form className={`${styles.panel} ${styles.splitMain}`} onSubmit={onSubmit}>
          <fieldset className={styles.fieldset}>
            <legend>{copy.customer.kind}</legend>
            <div className={styles.tiles}>
              {CATEGORIES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={styles.tile}
                  aria-pressed={option === category}
                  onClick={() => setCategory(option)}
                >
                  <CategoryIcon category={option} />
                  {copy.category[option]}
                </button>
              ))}
            </div>
          </fieldset>

          {category === "gas" && (
            <div role="alert" className={styles.alert}>
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l10 18H2z" />
                <path d="M12 10v5M12 18v.5" />
              </svg>
              <span>
                <strong>{copy.customer.gasTitle}</strong> {copy.customer.gasWarning}
              </span>
            </div>
          )}

          <label className={styles.field}>
            {copy.customer.subject}
            <input
              name="subject"
              required
              maxLength={200}
              placeholder={copy.customer.subjectHints[category]}
            />
          </label>
          <label className={styles.field}>
            {copy.customer.body}
            <textarea name="body" required rows={5} placeholder={copy.customer.bodyPlaceholder} />
          </label>
          <div className={styles.grid2}>
            <label className={styles.field}>
              {copy.customer.severity}
              <select name="severity" defaultValue="p3">
                {SEVERITIES.map((severity) => (
                  <option key={severity} value={severity}>
                    {copy.severity[severity]}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              {copy.customer.when}
              <select name="preferred_time" defaultValue="weekday_morning">
                {TIMES.map((time) => (
                  <option key={time} value={time}>
                    {copy.preferredTime[time]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {create.error && <ErrorMessage error={create.error} />}
          <div className={styles.actions}>
            <span />
            <button type="submit" className={styles.primary} disabled={create.isPending}>
              {create.isPending ? copy.customer.submitting : copy.customer.submit}
            </button>
          </div>
        </form>

        <aside className={`${styles.inkPanel} ${styles.splitSide}`}>
          <h2>{copy.customer.ratesTitle(categoryName)}</h2>
          <p>{copy.customer.ratesIntro}</p>
          <span className={styles.testTag}>{copy.customer.testPrices}</span>
          <ul className={styles.rates}>
            {copy.rates[category].map((item, index) => (
              <li key={item}>
                <span>{item}</span>
                <span className={styles.price}>
                  {copy.customer.yen(format.number(TEST_RATES[category][index] ?? 0))}
                </span>
              </li>
            ))}
          </ul>
          <p>{copy.customer.ratesFooter}</p>
        </aside>
      </div>
    </section>
  );
}
