import { afterEach, describe, expect, it, vi } from "vitest";
import { forgetAllMyTickets, listMyTickets, rememberMyTicket } from "./myTickets";

afterEach(() => {
  vi.restoreAllMocks();
  forgetAllMyTickets();
});

describe("myTickets", () => {
  it("remembers tickets created on this device, newest first", () => {
    rememberMyTicket({ id: "a", token: "ta", number: 1 });
    rememberMyTicket({ id: "b", token: "tb", number: 2 });
    expect(listMyTickets().map((t) => t.number)).toEqual([2, 1]);
  });

  it("does not store the same ticket twice", () => {
    rememberMyTicket({ id: "a", token: "ta", number: 1 });
    rememberMyTicket({ id: "a", token: "ta", number: 1 });
    expect(listMyTickets()).toHaveLength(1);
  });

  it("ignores a corrupt entry instead of crashing", () => {
    localStorage.setItem("nullbox.myTickets", "{not json");
    expect(listMyTickets()).toEqual([]);
  });

  it("keeps working in memory when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    rememberMyTicket({ id: "a", token: "ta", number: 7 });
    expect(listMyTickets().map((t) => t.number)).toEqual([7]);
  });
});
