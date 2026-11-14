import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useCopy } from "../../copy/CopyProvider";
import pages from "../pages.module.css";
import styles from "./customer.module.css";

/**
 * Your details (sign-up step 2). PREVIEW: nothing is saved until accounts
 * exist; the page says so. Saving just moves on to Report a problem.
 */
export function DetailsPage() {
  const copy = useCopy();
  const d = copy.details;
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <section className={`${pages.page} ${styles.narrow}`}>
      <ol className={styles.steps} aria-label={d.stepsLabel}>
        <li className={styles.stepDone}>
          <span className={styles.stepDot} aria-hidden="true">
            ✓
          </span>
          {d.steps.account}
        </li>
        <li className={styles.stepSep} aria-hidden="true">
          —
        </li>
        <li className={styles.stepCurrent} aria-current="step">
          <span className={styles.stepDot}>2</span>
          {d.steps.details}
        </li>
        <li className={styles.stepSep} aria-hidden="true">
          —
        </li>
        <li>
          <span className={styles.stepDot}>3</span>
          {d.steps.firstTicket}
        </li>
      </ol>

      <div className={styles.heading}>
        <h1>{d.title}</h1>
        <p>{d.intro}</p>
      </div>

      <form className={styles.panel} onSubmit={onSubmit}>
        <p className={styles.preview}>{d.preview}</p>
        <fieldset className={styles.fieldset}>
          <legend className={styles.sectionLegend}>{d.aboutYou}</legend>
          <div className={styles.grid2}>
            <label className={styles.field}>
              {d.fullName}
              <input autoComplete="name" placeholder={d.fullNamePlaceholder} />
            </label>
            <label className={styles.field}>
              {d.phone}
              <input type="tel" autoComplete="tel" placeholder="090-1234-5678" />
            </label>
            <label className={styles.field}>
              {d.emailInvoices}
              <input type="email" autoComplete="email" placeholder={copy.login.emailPlaceholder} />
            </label>
            <label className={styles.field}>
              {d.handymanLanguage}
              <select>
                {d.languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>
          </div>
          <Choices legend={d.contact} name="contact" options={d.contactOptions} />
        </fieldset>

        <div className={styles.divider} />

        <fieldset className={styles.fieldset}>
          <legend className={styles.sectionLegend}>{d.yourPlace}</legend>
          <div className={styles.grid3}>
            <label className={styles.field}>
              {d.postal}
              <input inputMode="numeric" autoComplete="postal-code" placeholder="530-0001" />
            </label>
            <label className={styles.field}>
              {d.prefecture}
              <select>
                {d.prefectures.map((prefecture) => (
                  <option key={prefecture}>{prefecture}</option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              {d.city}
              <input autoComplete="address-level2" placeholder={d.cityPlaceholder} />
            </label>
          </div>
          <div className={styles.grid2}>
            <label className={styles.field}>
              {d.street}
              <input autoComplete="address-line1" placeholder={d.streetPlaceholder} />
            </label>
            <label className={styles.field}>
              {d.building}
              <input autoComplete="address-line2" placeholder={d.buildingPlaceholder} />
            </label>
          </div>
          <Choices legend={d.placeType} name="placeType" options={d.placeTypes} />
          <label className={styles.field}>
            {d.gettingIn}
            <textarea rows={3} placeholder={d.gettingInPlaceholder} />
          </label>
        </fieldset>

        <label className={styles.consent}>
          <input type="checkbox" /> {d.consent}
        </label>
        <div className={styles.actions}>
          <Link to="/login" className={styles.secondary}>
            {d.back}
          </Link>
          <button type="submit" className={styles.primary}>
            {d.save}
          </button>
        </div>
      </form>
    </section>
  );
}

function Choices({ legend, name, options }: { legend: string; name: string; options: string[] }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{legend}</legend>
      <div className={styles.choices}>
        {options.map((option, index) => (
          <label key={option} className={styles.choice}>
            <input type="radio" name={name} defaultChecked={index === 0} /> {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
