import React from "react";
import { Link } from "react-router-dom";
import "../css/dashboard.css";
import logo from "../images/logo.png";

function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="">
        <Link to="/" className="logout">
          Logout
        </Link>
      </div>
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
