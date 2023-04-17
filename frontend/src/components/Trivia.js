import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { leaderboardPatch, questionsFetch } from "../apiCalls/fetch.js";
import { Container, Modal, Button } from "react-bootstrap";

function Trivia() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [questionsData, setQuestionsData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelect = async (answer) => {
    if (answer === questionsData[questionIndex].correctAnswer) {
      setScore(score + 20);
      setCorrect(correct + 1);
    }
    if (questionIndex === 4) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const onSwitchPage = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (user?.username === "admin") {
      navigate("/admin");
    }
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }

    if (questionIndex === 5) {
      leaderboardPatch(user.username, { score: score });
    }
    async function fetchData() {
      const data = await questionsFetch();
      setQuestionsData(data[0].questions);
    }
    fetchData();
  }, [score, user.username, questionIndex]);
  return (
    <Container>
      <Modal show={true} centered backdrop={false}>
        <Modal.Header>
          <Modal.Title>Scales of Knowledge</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {questionIndex === 5 ? (
            <h1></h1>
          ) : (
            questionsData.length > 0 && (
              <div className="questionTitle">
                <h1>
                  {questionIndex + 1}. {questionsData[questionIndex].question}
                </h1>
              </div>
            )
          )}
          {questionIndex === 5 ? (
            <div className="finished">
              <h1>You got {correct} / 5 correct!</h1>
              <h1>Your score is {score}</h1>
            </div>
          ) : (
            questionsData.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {questionsData[questionIndex].options.map((item, index) => (
                  <Button
                    variant="primary"
                    onClick={() => handleSelect(item, index)}
                    key={item}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          {questionIndex === 5 && (
            <Button variant="primary" onClick={onSwitchPage}>
              Back
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Trivia;
