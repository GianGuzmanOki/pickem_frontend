import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {

  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route {...rest} render={({ location }) => {
      return isAuthenticated
        ? children
        : <Redirect to={{
            pathname: '/',
            state: { from: location }
          }} />
    }} />
  )
}