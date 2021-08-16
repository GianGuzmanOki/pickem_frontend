import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SignForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/v1/login`, {
      // TODO: change to env variable
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // TODO: if data.failure exists, it should show an error message
        console.log('data: ', data);
        localStorage.setItem("token", data.jwt);
        props.handleLogin(data.user);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={username}
          type="email"
          placeholder="Enter email"
          onChange={handleUsernameChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Sign In
      </Button>
    </Form>
  );
}

export default SignForm;
