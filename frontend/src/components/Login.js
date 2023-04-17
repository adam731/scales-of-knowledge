import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../apiCalls/fetch.js";
import { Container, Modal, Button, Form, Alert } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onSwitchPage = () => {
    navigate("/signup");
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
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newError = await loginFetch(username, password);
    if (newError !== true) {
      navigate("/dashboard");
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
                <p>Username or Password is incorrect.</p>
              </Alert>
            )}
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
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Login;
