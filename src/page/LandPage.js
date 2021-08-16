import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import MatchService from "../services/MatchService";
import PickService from "../services/PickService";
import Paginate from "../components/Paginate";

function LandPage({ user, setUser }) {
  // ui
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState("signIn");

  // pagination
  const [data, setData] = useState();

  // fetch matches
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    async function fetchMatches() {
      const matchService = new MatchService();
      const data = await matchService.list({ page: 1 });
      setData(data);
      const { matches } = data;
      setMatches(matches);
    }
    fetchMatches();
  }, [user]);

  const handleClose = () => setShow(false);

  const handleShow = (formType) => {
    setFormType(formType);
    setShow(true);
  };

  const isUserLogged = user?.id !== undefined;

  const handleLogin = (user) => {
    setUser(user);
    handleClose();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  const handlePick = async (matchQuestionId, teamId) => {
    if (!isUserLogged) {
      setFormType("signIn");
      setShow(true);
    } else {
      const pickService = new PickService();
      const pickResponse = await pickService.create({
        match_question_id: matchQuestionId,
        team_id: teamId,
      });
      alert(pickResponse.message);
    }
  };

  const handlePageChange = async (pageSelected) => {
    const matchService = new MatchService();
    const data = await matchService.list({ page: pageSelected });
    setData(data);
    const { matches } = data;
    setMatches(matches);
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formType === "signIn" ? "Sign In" : "Sign Up"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formType === "signIn" ? (
            <SignInForm handleLogin={handleLogin} setFormType={setFormType} />
          ) : (
            <SignUpForm handleLogin={handleLogin} setFormType={setFormType} />
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
                <Button
                  onClick={() => handlePick(match.default_question_value, match.home_team_id)}
                >
                  {match.home_team}
                </Button>
                <span className="mx-5">vs</span>
                <Button
                  onClick={() => handlePick(match.default_question_value, match.away_team_id)}
                >
                  {match.away_team}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          {data ? (
            <Paginate
              defaultActivePage={1}
              totalPages={data.meta.total_pages}
              onPageChange={handlePageChange}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default LandPage;
