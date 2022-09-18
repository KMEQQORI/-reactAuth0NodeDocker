import React, { useEffect, useState, useCallback } from "react";
import SideBar from "./Features/SideBar/SideBar";
import Profile from "./Features/Profile/Profile";
import Projects from "./Features/Projects/Projects.js";
import budget from "./Features/Budget/Budget.js";
import Tasks from "./Features/Tasks/Tasks.js";
import { Route, withRouter } from "react-router-dom";
import SecuredRoute from "./Features/SecuredRoute/SecuredRoute";
import auth0Client from "./Auth";
import Callback from "./Callback";

const App = props => {
  const [checkingSession, setCheckingSession] = useState(false);
  const [, updateState] = React.useState();

  const forceUpdate = useCallback(() => updateState({}), []);

  const connect = useCallback(async () => {
    if (props.location.pathname === "/callback") {
      setCheckingSession(false);
      return;
    }
    try {
      await auth0Client.silentAuth();
      forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
    setCheckingSession(false);
  }, [props.location.pathname, forceUpdate]);

  useEffect(() => {
    connect();
  }, []);

  return (
    <div style={{ marginLeft: "70px", zIndex: "1" }}>
      <>
        <SideBar />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute
          exact
          path="/profile"
          component={Profile}
          checkingSession={checkingSession}
        />
        <SecuredRoute
          exact
          path="/project"
          component={Projects}
          checkingSession={checkingSession}
        />
        <SecuredRoute
          exact
          path="/budget"
          component={budget}
          checkingSession={checkingSession}
        />
        <SecuredRoute
          exact
          path="/task/:idProject"
          component={Tasks}
          checkingSession={checkingSession}
        />
      </>
    </div>
  );
};

export default withRouter(App);
