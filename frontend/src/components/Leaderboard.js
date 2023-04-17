import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { leaderboardFetch } from "../apiCalls/fetch.js";
import "../css/leaderboard.css";
import Header from "./Header.js";
import Logout from "./Logout.js";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userTotalScore, setUserTotalScore] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
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
  console.log(leaderboardData.globalStats);

  return (
    <div className="leaderboardPage">
      <Header />
      <Logout />
      <div className="leaderboard">
        {leaderboardData.length > 0 && (
          <div className="leaderTable">
            <table className="">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total Score</th>
              </tr>
              {leaderboardData.map((user, index) => (
                <tr>
                  <td>{index + 1}.</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
        <div>
          <h1>Your total score: {userTotalScore}</h1>
        </div>
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
    </div>
  );
}

export default Leaderboard;
