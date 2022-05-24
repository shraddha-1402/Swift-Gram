import {
  Route,
  BrowserRouter as Router,
  Routes as RoutesContainer,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";

import App from "./App";
import {
  Bookmark,
  HomePage,
  ProfilePage,
  Signin,
  Signup,
  SinglePostPage,
  Explore,
} from "./features";
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
            <Route path={routes.BOOKMARKS} element={<Bookmark />} />
            <Route
              path={`${routes.SINGLE_POST}/:postId`}
              element={<SinglePostPage />}
            />
            <Route path={routes.EXPLORE} element={<Explore />} />
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
