/**
 * Tickets created on this device, with their secret tokens, so "My tickets"
 * can list them before accounts exist. This is NOT an account: another
 * browser starts empty, and clearing site data forgets them (the secret link
 * shown after submitting still works). Replace with the user's tickets once
 * login lands.
 */
export interface MyTicket {
  id: string;
  token: string;
  number: number;
}

const STORAGE_KEY = "nullbox.myTickets";
const listeners = new Set<() => void>();
let memory: MyTicket[] | null = null;

function isMyTicket(value: unknown): value is MyTicket {
  const t = value as MyTicket;
  return (
    typeof t === "object" &&
    t !== null &&
    typeof t.id === "string" &&
    typeof t.token === "string" &&
    typeof t.number === "number"
  );
}

function load(): MyTicket[] {
  if (memory) return memory;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    memory = Array.isArray(parsed) ? parsed.filter(isMyTicket) : [];
  } catch {
    memory = [];
  }
  return memory;
}

function save(next: MyTicket[]): void {
  memory = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private window): keep them for this visit only.
  }
  for (const listener of listeners) listener();
}

/** Newest first. Returns the same array until something changes. */
export function listMyTickets(): MyTicket[] {
  return load();
}

export function rememberMyTicket(ticket: MyTicket): void {
  const rest = load().filter((t) => t.id !== ticket.id);
  save([ticket, ...rest]);
}

export function forgetAllMyTickets(): void {
  memory = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // nothing stored
  }
  for (const listener of listeners) listener();
}

export function subscribeMyTickets(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
