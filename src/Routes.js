import {
  Route,
  BrowserRouter as Router,
  Routes as RoutesContainer,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";

import App from "./App";
import { HomePage, ProfilePage, Signin, Signup } from "./features";
import { PrivateRoute } from "./components";
import { routes } from "./constants";

const Routes = () => {
  return (
    <Router>
      <CssBaseline />
      <RoutesContainer>
        <Route element={<PrivateRoute />}>
          <Route element={<App />}>
            <Route path={routes.HOME} element={<HomePage />} />
            <Route
              path={`${routes.PROFILE}/:username`}
              element={<ProfilePage />}
            />
          </Route>
        </Route>

        <Route element={<PrivateRoute authRoute={true} />}>
          <Route path={routes.SIGNIN} element={<Signin />} />
          <Route path={routes.SIGNUP} element={<Signup />} />
        </Route>
      </RoutesContainer>
    </Router>
  );
};

export { Routes };
