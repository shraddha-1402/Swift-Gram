import {
  Route,
  BrowserRouter as Router,
  Routes as RoutesContainer,
} from "react-router-dom";

import { CssBaseline } from "@mui/material";

import App from "./App";
import { HomePage } from "./features";
import { routes } from "./constants";

const Routes = () => {
  return (
    <Router>
      <CssBaseline />
      <RoutesContainer>
        <Route element={<App />}>
          <Route path={routes.HOME} element={<HomePage />} />
        </Route>
      </RoutesContainer>
    </Router>
  );
};

export { Routes };
