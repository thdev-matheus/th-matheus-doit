import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function Routes() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@doIt:token"));

    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <Home authenticated={authenticated} />
      </Route>
      <Route exact path="/signup">
        <Signup authenticated={authenticated} />
      </Route>
      <Route exact path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
}
