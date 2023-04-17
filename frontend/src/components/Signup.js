import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Button, Form, Alert } from "react-bootstrap";
import { registerFetch } from "../apiCalls/fetch.js";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
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

  const handleChange = (element, value) => {
    if (element === "username") {
      setUsername(value);
    } else if (element === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newError = await registerFetch(email, username, password);
    if (newError !== true) {
      navigate("/");
    }
    setError(newError);
  };
  return (
    <Container>
      <Modal show={true} centered backdrop={false}>
        <Modal.Header>
          <Modal.Title>Scales of Knowledge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            {error && (
              <Alert variant="danger">
                <Alert.Heading>Error:</Alert.Heading>
                <p>Username or Email already exists.</p>
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
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
