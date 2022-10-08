import { DASHBOARD_ROUTES } from "../components/dashboard/Routes";

export const findIndexOfActiveRoute = (routeName) => {
  for (let i = 0; i < DASHBOARD_ROUTES.length; i++) {
    const r = DASHBOARD_ROUTES[i];
    if (r.path === routeName) return i;
  }
  return 0;
};
