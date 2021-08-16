import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandPage from "./page/LandPage";
import Profile from "./page/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import { BASE_URL } from "./services/api_fetch";

export default function App() {
  const [user, setUser] = useState({});

  // get user data on reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${BASE_URL}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandPage user={user} setUser={setUser} />
        </Route>

        <PrivateRoute path="/profile">
          <Profile user={user} setUser={setUser} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
