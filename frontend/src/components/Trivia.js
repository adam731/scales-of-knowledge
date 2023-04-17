import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../css/trivia.css";
import Header from "./Header.js";
import Logout from "./Logout.js";
import { questionsFetch } from "../apiCalls/fetch.js";

function Trivia() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate("/");
    }
    async function fetchData() {
      const data = await questionsFetch();
      setQuestionsData(data[0].questions);
    }
    fetchData();
  }, []);
  return (
    <div className="triviaPage">
      <div></div>
      <h1>{user && user.username}</h1>
      <Header />
      <Logout />
      <div className="trivia">
        <Link to="/dashboard" className="backButton">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Trivia;
