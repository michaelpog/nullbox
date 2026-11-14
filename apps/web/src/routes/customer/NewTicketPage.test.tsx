import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "../../api/client";
import { forgetAllMyTickets, listMyTickets } from "../../api/myTickets";
import { CopyProvider } from "../../copy/CopyProvider";
import { NewTicketPage } from "./NewTicketPage";

function renderPage() {
  const router = createMemoryRouter(
    [
      { path: "/", element: <NewTicketPage /> },
      { path: "/tickets", element: <p>my tickets page</p> },
    ],
    { initialEntries: ["/"] },
  );
  render(
    <QueryClientProvider client={new QueryClient()}>
      <CopyProvider locale="en">
        <RouterProvider router={router} />
      </CopyProvider>
    </QueryClientProvider>,
  );
  return router;
}

afterEach(() => {
  vi.restoreAllMocks();
  forgetAllMyTickets();
});

describe("NewTicketPage", () => {
  it("warns about gas leaks only when Gas is picked", async () => {
    renderPage();
    expect(screen.queryByText(/Smell gas\?/)).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Gas" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Smell gas?");
    expect(screen.getByRole("button", { name: "Gas" })).toHaveAttribute("aria-pressed", "true");
  });

  it("sends the category and visit time, remembers the ticket and opens My tickets", async () => {
    const create = vi.spyOn(api, "createTicket").mockResolvedValue({
      ticket: { id: "t1", number: 14 } as never,
      access_token: "secret",
      access_link: "http://localhost:5173/t/t1#secret",
    });
    const router = renderPage();

    await userEvent.click(screen.getByRole("button", { name: "Electrical" }));
    await userEvent.type(screen.getByLabelText("Subject"), "Breaker trips");
    await userEvent.type(screen.getByLabelText("What happened?"), "With the kettle on.");
    await userEvent.selectOptions(screen.getByLabelText("When can we come?"), "weekend");
    await userEvent.click(screen.getByRole("button", { name: "Send it to the handymen" }));

    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        subject: "Breaker trips",
        category: "electrical",
        preferred_time: "weekend",
        severity: "p3",
      }),
    );
    await screen.findByText("my tickets page");
    expect(listMyTickets()).toEqual([{ id: "t1", token: "secret", number: 14 }]);
    expect(router.state.location.pathname).toBe("/tickets");
  });
});
