
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function Profile({user, setUser}) {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    setUser({})
    history.push("/");
  };

  return (
    <>
      <div>Profile</div>
      <p>email: {user.email}</p>

      <Button onClick={() => logout()}>Sign out</Button>
    </>
  );
}
