import React, { useEffect, useState } from "react";
import Logout from "./Logout.js";
import { useNavigate } from "react-router-dom";
import { Form, Container, Modal, Button } from "react-bootstrap";
function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user?.username !== "admin") {
      navigate("/dashboard");
    }
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }
  });

  return (
    <Container>
      <Modal show={true} centered backdrop={false}>
        <Modal.Header>
          <Modal.Title>Scales of Knowledge</Modal.Title>
          <Logout />
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <h1>Welcome Admin</h1>
          <h1>Add Questions</h1>
          <Form action="" encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Control
                type="file"
                name="jsonFile"
                placeholder="jsonFile"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
