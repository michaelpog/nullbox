import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { HandymanBeast } from "../../components/Beast/HandymanBeast";
import { useCopy } from "../../copy/CopyProvider";
import styles from "./customer.module.css";

const CATEGORIES = ["plumbing", "electrical", "gas", "air_conditioning", "moving"] as const;

/**
 * Log in. PREVIEW: there are no accounts yet (login is its own delivery), so
 * the form says so and just opens My tickets. Nothing typed here is sent anywhere.
 */
export function LoginPage() {
  const copy = useCopy();
  const navigate = useNavigate();
  const [role, setRole] = useState<"customer" | "handyman">("customer");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(role === "handyman" ? "/inbox" : "/tickets");
  };

  return (
    <div className={styles.loginCard}>
      <section className={styles.loginHero}>
        <h1>
          {copy.login.heroTitle}
          <br />
          {copy.login.heroTitle2}
        </h1>
        <p>{copy.login.heroBody}</p>
        <div className={styles.heroChips}>
          {CATEGORIES.map((category) => (
            <span key={category}>{copy.category[category]}</span>
          ))}
        </div>
        <div className={styles.heroBeast}>
          <HandymanBeast mood="asleep" label={copy.beast.labels.asleep} />
          <p>
            <strong>{copy.login.heroBeastStrong}</strong> {copy.login.heroBeast}
          </p>
        </div>
      </section>

      <form className={styles.loginForm} onSubmit={onSubmit}>
        <div className={styles.heading}>
          <h2>{copy.login.welcome}</h2>
          <p>{copy.login.welcomeBody}</p>
        </div>
        <p className={styles.preview}>{copy.login.preview}</p>
        <fieldset className={styles.fieldset}>
          <legend className={styles.srOnly}>{copy.login.roleLabel}</legend>
          <div className={styles.segmented}>
            <button
              type="button"
              aria-pressed={role === "customer"}
              onClick={() => setRole("customer")}
            >
              {copy.login.roleCustomer}
            </button>
            <button
              type="button"
              aria-pressed={role === "handyman"}
              onClick={() => setRole("handyman")}
            >
              {copy.login.roleHandyman}
            </button>
          </div>
        </fieldset>
        {role === "handyman" && <p className={styles.note}>{copy.login.handymanNote}</p>}
        <label className={styles.field}>
          {copy.login.email}
          <input type="email" autoComplete="email" placeholder={copy.login.emailPlaceholder} />
        </label>
        <label className={styles.field}>
          {copy.login.password}
          <input type="password" autoComplete="current-password" />
        </label>
        <div className={styles.row}>
          <label className={styles.check}>
            <input type="checkbox" /> {copy.login.keepLoggedIn}
          </label>
          <a href="#forgot" aria-disabled="true">
            {copy.login.forgot}
          </a>
        </div>
        <button type="submit" className={`${styles.primary} ${styles.full}`}>
          {copy.login.submit}
        </button>
        <p className={styles.center}>
          {copy.login.newHere} <Link to="/details">{copy.login.createAccount}</Link>
        </p>
      </form>
    </div>
  );
}
