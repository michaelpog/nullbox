import { createBrowserRouter } from "react-router";
import { AppShell } from "./components/AppShell";
import { CustomerTicketPage } from "./routes/customer/CustomerTicketPage";
import { DetailsPage } from "./routes/customer/DetailsPage";
import { LoginPage } from "./routes/customer/LoginPage";
import { MyTicketsPage } from "./routes/customer/MyTicketsPage";
import { NewTicketPage } from "./routes/customer/NewTicketPage";
import { NotFoundPage } from "./routes/NotFoundPage";
import { InboxPage } from "./routes/worker/InboxPage";
import { WorkerTicketPage } from "./routes/worker/WorkerTicketPage";

/**
 * All routes, in one place. For Tauri (no server to rewrite deep links),
 * swap `createBrowserRouter` for `createHashRouter`: that's the only change.
 */
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      // customer portal
      { path: "/", element: <NewTicketPage /> },
      { path: "/t/:id", element: <CustomerTicketPage /> },
      { path: "/tickets", element: <MyTicketsPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/details", element: <DetailsPage /> },
      // worker inbox
      { path: "/inbox", element: <InboxPage /> },
      { path: "/inbox/:id", element: <WorkerTicketPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
