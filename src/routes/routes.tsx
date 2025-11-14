import type { JSX } from "react/jsx-dev-runtime";
import Admin from "../pages/Admin";
import Profile from "../pages/Profile";
import MessageCentre from "../pages/MessageCentre";
import Management from "../pages/Management";

export type RouteType = { path: string; element: JSX.Element };

export const adminRoutes: RouteType[] = [
  { path: "/admin", element: <Admin /> },
  { path: "/profile", element: <Profile /> },
];

export const clientRoutes: RouteType[] = [
  { path: "/profile", element: <Profile /> },
  { path: "/manage_devices", element: <Management /> },
  { path: "/message_center", element: <MessageCentre /> },
];
