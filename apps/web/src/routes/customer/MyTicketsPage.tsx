import { useState, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router";
import type { CreateTicketResponse } from "../../api/generated/CreateTicketResponse";
import type { Ticket } from "../../api/generated/Ticket";
import type { TicketStatus } from "../../api/generated/TicketStatus";
import { listMyTickets, type MyTicket, subscribeMyTickets } from "../../api/myTickets";
import { useBacklogStats, useMyTicketThreads } from "../../api/queries";
import { Beast } from "../../components/Beast/Beast";
import { ErrorMessage, Loading } from "../../components/Feedback";
import { useCopy, useFormat } from "../../copy/CopyProvider";
import pages from "../pages.module.css";
import styles from "./customer.module.css";

type Tab = "current" | "pending" | "paid";

/** Which tab a status belongs to. Invoices come later: `resolved` = fixed, waiting for one. */
const TAB_OF: Record<TicketStatus, Tab> = {
  open: "current",
  in_progress: "current",
  waiting_on_customer: "current",
  resolved: "pending",
  closed: "paid",
};
const TABS: Tab[] = ["current", "pending", "paid"];

export function MyTicketsPage() {
  const copy = useCopy();
  const mine = useSyncExternalStore(subscribeMyTickets, listMyTickets);
  const threads = useMyTicketThreads(mine);
  const created = (useLocation().state as { created?: CreateTicketResponse } | null)?.created;
  const [tab, setTab] = useState<Tab>("current");

  const rows = mine.flatMap((entry, index) => {
    const data = threads[index]?.data;
    return data ? [{ entry, ticket: data.ticket }] : [];
  });
  const loading = threads.some((t) => t.isPending);
  const failed = threads.find((t) => t.error)?.error;
  const inTab = (t: Tab) => rows.filter((r) => TAB_OF[r.ticket.status] === t);

  return (
    <section className={pages.page}>
      <div className={styles.split}>
        <div className={`${styles.splitMain} ${pages.page}`}>
          <h1>{copy.myTickets.title}</h1>
          {created && <CreatedNotice created={created} />}
          <div
            role="tablist"
            aria-label={copy.myTickets.tabsLabel}
            className={`${styles.segmented} ${styles.tabs}`}
          >
            {TABS.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={option === tab}
                onClick={() => setTab(option)}
              >
                {copy.myTickets.tabs[option](inTab(option).length)}
              </button>
            ))}
          </div>
          <div role="tabpanel" className={styles.cards}>
            {mine.length === 0 && <p className={styles.empty}>{copy.myTickets.noTickets}</p>}
            {mine.length > 0 && loading && rows.length === 0 && <Loading />}
            {failed !== undefined && <ErrorMessage error={failed} />}
            {mine.length > 0 && !loading && inTab(tab).length === 0 && (
              <p className={styles.empty}>{copy.myTickets.empty[tab]}</p>
            )}
            {inTab(tab).map(({ entry, ticket }) => (
              <TicketCard key={ticket.id} entry={entry} ticket={ticket} />
            ))}
          </div>
          <p className={styles.note}>{copy.myTickets.deviceNote}</p>
        </div>
        <BeastAside />
      </div>
    </section>
  );
}

function TicketCard({ entry, ticket }: { entry: MyTicket; ticket: Ticket }) {
  const copy = useCopy();
  const format = useFormat();
  const tab = TAB_OF[ticket.status];
  const meta =
    ticket.assignee_name && tab === "current"
      ? copy.myTickets.acceptedBy(ticket.assignee_name)
      : copy.myTickets.sent(format.ago(ticket.created_at));
  return (
    <Link to={`/t/${ticket.id}#${entry.token}`} className={styles.card}>
      <div className={styles.cardMain}>
        <div className={styles.cardTitle}>
          <span>#{ticket.number}</span>
          <h3>{ticket.subject}</h3>
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.chip}>
            {ticket.category ? copy.category[ticket.category] : copy.noCategory}
          </span>
          <span>{meta}</span>
        </div>
        {tab === "pending" && (
          <span className={styles.invoiceNote}>{copy.myTickets.invoiceNotIssued}</span>
        )}
      </div>
      <span className={`${styles.pill} ${styles[`pill_${ticket.status}`]}`}>
        {tab === "paid" ? copy.myTickets.done : copy.status[ticket.status]}
      </span>
    </Link>
  );
}

function CreatedNotice({ created }: { created: CreateTicketResponse }) {
  const copy = useCopy();
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.created} role="status">
      <p>
        <strong>{copy.myTickets.created(created.ticket.number)}</strong>
      </p>
      <p>{copy.myTickets.secretLink}</p>
      <div className={styles.linkRow}>
        <code>{created.access_link}</code>
        <button
          type="button"
          onClick={() =>
            navigator.clipboard.writeText(created.access_link).then(() => setCopied(true))
          }
        >
          {copied ? copy.customer.copied : copy.customer.copyLink}
        </button>
      </div>
    </div>
  );
}

/** The Handyman Beast, fed by the real backlog (all open tickets, not only yours). */
function BeastAside() {
  const copy = useCopy();
  const format = useFormat();
  const stats = useBacklogStats();
  return (
    <aside className={`${styles.beastPanel} ${styles.splitSide}`}>
      <h2>{copy.beast.title}</h2>
      {stats.data && (
        <>
          <Beast mood={stats.data.beast_mood} />
          <p className={styles.bigCount}>
            {copy.myTickets.beastOpen(format.number(stats.data.open_count))}
          </p>
        </>
      )}
      {stats.error && <ErrorMessage error={stats.error} />}
      <Link to="/" className={`${styles.primary} ${styles.full}`}>
        {copy.myTickets.report}
      </Link>
    </aside>
  );
}
