import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/leaderboard.css";
import Header from "./Header.js";
import Logout from "./Logout.js";

function Leaderboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }
  });

  return (
    <div className="leaderboardPage">
      <h1>{user && user.username}</h1>
      <Header />
      <Logout />
      <div className="leaderboard">
        <Link to="/dashboard" className="backButton">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Leaderboard;
