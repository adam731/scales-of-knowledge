import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import Logout from "./Logout.js";
import Header from "./Header.js";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const localStorageKey = `lastPlayed_${user._id}`;
  const [canPlay, setCanPlay] = useState(true);
  useEffect(() => {
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
        setCanPlay(false);
      }
    }
  });

  function handlePlay() {
    localStorage.setItem(localStorageKey, new Date().toISOString());
    setCanPlay(false);
    navigate("/trivia");
  }

  return (
    <div className="dashboardPage">
      <Header />
      <Logout />
      {canPlay ? (
        <div className="play">
          <a className="triviaButton" onClick={() => handlePlay()}>
            Play Game
          </a>
        </div>
      ) : (
        <h1>You have already played today.</h1>
      )}
      <div className="leaderboard">
        <Link
          to="/leaderboard"
          style={{ color: "#3A98B9", textDecoration: "none", fontSize: "2rem" }}
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
