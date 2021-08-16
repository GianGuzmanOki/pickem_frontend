import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import matches from "./constants/matches"

function App() {
  console.log('matches: ', matches);

  return (
    <Container>
      <Row className="mb-4 mt-2">
        <Col className="text-right">
          <Button>Login button</Button>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <h1 className="text-center">Pick'em</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        {matches.map((match) =>
          <Col xs={6} className="mb-3">
            <Card>
              <Card.Body className="mx-auto">
                <Button className="mr-5">{match.team1}</Button>
                <Button>{match.team2}</Button>
              </Card.Body>
            </Card>
          </Col>)}
      </Row>
    </Container>
  );
}

export default App;
