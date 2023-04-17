import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { leaderboardFetch } from "../apiCalls/fetch.js";
import Logout from "./Logout.js";
import { Container, Modal, Button, Table, Alert } from "react-bootstrap";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userTotalScore, setUserTotalScore] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user?.username === "admin") {
      navigate("/admin");
    }
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }

    async function fetchData() {
      const data = await leaderboardFetch(user.username);
      setUserTotalScore(data.userStats);
      setLeaderboardData(data.globalStats);
    }
    fetchData();
  }, []);

  const onSwitchPage = () => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <Modal show={true} centered backdrop={false}>
        <Modal.Header>
          <Modal.Title>Scales of Knowledge</Modal.Title>
          <Logout />
        </Modal.Header>
        <Modal.Body>
          <Alert variant="primary">Your total score is: {userTotalScore}</Alert>
          {leaderboardData.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}.</td>
                    <td>{user.username}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSwitchPage}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Leaderboard;
