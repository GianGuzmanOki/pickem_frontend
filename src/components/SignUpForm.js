import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../services/api_fetch";

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

    fetch(`${BASE_URL}/users`, {
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
        localStorage.setItem("token", data.jwt);
        props.handleLogin(data.user);
      });

    setUsername("");
    setPassword("");
  };

  const handleToggleForm = () => {
    props.setFormType("signIn");
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

      <div className="d-flex justify-content-between">
        <Button variant="link" onClick={handleToggleForm}>
          Sign In
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </Form>
  );
}

export default SignForm;
