import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import Container from '@material-ui/core/Container';
import {CHALLENGE} from "./Routes";

const MainRouter = () => {
  return (
      <Router>
        <Container>
          <Switch>
            <Route
              component={Dashboard}
              path={CHALLENGE}
              exact
            />
            {/*Intentionally left at the bottom*/}
            <Route
              exact
              path={"/*"}
              render={() => {
                return <Redirect to={CHALLENGE} />;
              }}
            />
          </Switch>
        </Container>
      </Router>
  );
};

export default MainRouter;
