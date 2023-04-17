import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import Logout from "./Logout.js";
import Header from "./Header.js";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }
  });

  return (
    <div className="dashboardPage">
      <h1>{user && user.username}</h1>
      <Header />
      <Logout />
      <div className="play">
        <Link to="/trivia" className="triviaButton">
          Play Game
        </Link>
      </div>
      <div className="leaderboard">
        <Link to="/leaderboard" className="leaderboardButton">
          Leaderboard
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
