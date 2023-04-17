import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import logo from "../images/logo.png";

function Forgot() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <div className="header">
        <h1>Scales of Knowledge</h1>
        <img src={logo} alt="" />
      </div>
      <div className="loginPage">
        <div className="loginTitle">
          <h1>Forgot Password</h1>
        </div>
        <div className="loginForm">
          <form action="">
            <div className="loginInput">
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email"
              />
            </div>
            <div className="loginSubmit">
              <input type="submit" value="Submit" />
            </div>
            <div className="loginButtons">
              <Link to="/" style={{ color: "#3A98B9", textDecoration: "none" }}>
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgot;
