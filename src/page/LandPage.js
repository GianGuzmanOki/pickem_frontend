import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

import matches from "../constants/matches";

function LandPage({ user, setUser }) {
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState("signIn");
  const handleClose = () => setShow(false);

  const handleShow = (formType) => {
    setFormType(formType);
    setShow(true);
  };

  const isUserLogged = user?.id !== undefined;

  const handleLogin = (user) => {
    console.log('user: ', user);
    setUser(user);
    handleClose();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({})
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{formType === "signIn" ? "Sign In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === "signIn" ? (
            <SignInForm handleLogin={handleLogin} />
          ) : (
            <SignUpForm handleLogin={handleLogin} />
          )}
        </Modal.Body>
      </Modal>
      <Row className="mb-4 mt-2">
        <Col className="d-flex justify-content-end align-items-center">
          {isUserLogged ? (
            <p className="mb-0 mr-2">
              Hello, <Link to="/profile">{`${user.email}`}</Link>
            </p>
          ) : (
            ""
          )}
          {isUserLogged ? (
            <Button onClick={logout}>Sign out</Button>
          ) : (
            <>
              <Button variant="link" onClick={() => handleShow("signUp")}>
                Sign up
              </Button>
              <Button onClick={() => handleShow("signIn")}>Sign In</Button>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <h1 className="text-center">Pick'em</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        {matches.map((match, index) => (
          <Col key={index} xs={6} className="mb-3">
            <Card>
              <Card.Body className="mx-auto">
                <Button className="mr-5">{match.team1}</Button>
                <Button>{match.team2}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LandPage;
