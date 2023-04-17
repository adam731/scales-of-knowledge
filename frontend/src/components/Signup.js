import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Button, Form, Alert } from "react-bootstrap";

function Signup() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onSwitchPage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (user?.username === "admin") {
      navigate("/admin");
    }
    if (user) {
      navigate("/dashboard");
    }
  });
  return (
    <Container>
      <Modal show={true} centered backdrop={false}>
        <Modal.Header>
          <Modal.Title>Scales of Knowledge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" action="/api/register">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control type="email" name="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSwitchPage} variant="primary">
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Signup;
