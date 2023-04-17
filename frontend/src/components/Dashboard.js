import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout.js";
import { Container, Modal, Button } from "react-bootstrap";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const localStorageKey = `lastPlayed_${user?._id}`;
  const [cantPlay, setCantPlay] = useState(false);
  useEffect(() => {
    if (user?.username === "admin") {
      navigate("/admin");
    }
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }

    const lastPlayed = localStorage.getItem(localStorageKey);
    if (lastPlayed) {
      const now = new Date();
      const lastPlayedDate = new Date(lastPlayed);
      const diff = now.getTime() - lastPlayedDate.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      if (diffInDays < 1) {
        setCantPlay(true);
      }
    }
  });

  function handlePlay() {
    localStorage.setItem(localStorageKey, new Date().toISOString());
    setCantPlay(false);
    navigate("/trivia");
  }

  const onSwitchPage = () => {
    navigate("/leaderboard");
  };

  return (
    <Container>
      <Modal show={true} centered backdrop={false}>
        <Modal.Header>
          <Modal.Title>Scales of Knowledge</Modal.Title>
          <Logout />
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <Button
            onClick={() => handlePlay()}
            variant="primary"
            disabled={cantPlay}
          >
            Play Game
          </Button>
          <Button onClick={onSwitchPage} variant="primary">
            Leaderboard
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
