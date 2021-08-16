import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import SignUpForm from "./SignupForm";

import matches from "./constants/matches";

function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({});
  const isUserLogged = user?.id !== undefined;

  const handleSignUp = (user) => {
    setUser(user);
    handleClose();
  };

  const logout = () => {
    localStorage.removeItem("token");
  }

  return (
    <Container>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm handleSignUp={handleSignUp} />
        </Modal.Body>
      </Modal>
      <Row className="mb-4 mt-2">
        <Col className="d-flex justify-content-end align-items-center">
          <p className="mb-0 mr-2">{isUserLogged ? `Hello, ${user.email}` : ""}</p>
          {isUserLogged ? (<Button onClick={logout}>Logout</Button>) : (<Button onClick={handleShow}>Sign up</Button>)}
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

export default App;
