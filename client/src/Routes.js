import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TASKSLIST_ROUTE,
  HOME_ROUTE,
} from "./utils/Consts";
import TasksList from "./pages/TasksList";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export const authRoutes = [
  {
    path: TASKSLIST_ROUTE,
    Component: TasksList,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
