import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/trivia.css";
import Header from "./Header.js";
import { leaderboardPatch, questionsFetch } from "../apiCalls/fetch.js";

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

  useEffect(() => {
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
    <div className="triviaPage">
      <Header />
      <div className="trivia">
        <div className="questionaire">
          {questionIndex === 5 ? (
            <h1>See you tomorrow!</h1>
          ) : (
            questionsData.length > 0 && (
              <div className="questionTitle">
                <h1>{questionsData[questionIndex].question}</h1>
              </div>
            )
          )}
          {questionIndex === 5 ? (
            <div className="finished">
              <h1>You got {correct} / 5 correct!</h1>
              <h1>Your score is {score}</h1>
              <Link
                to="/dashboard"
                style={{
                  color: "#3A98B9",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
              >
                Back
              </Link>
            </div>
          ) : (
            questionsData.length > 0 && (
              <div className="question">
                {questionsData[questionIndex].options.map((item, index) => (
                  <div className="buttons">
                    <button onClick={() => handleSelect(item, index)}>
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Trivia;
