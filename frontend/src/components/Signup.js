import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import logo from "../images/logo.png";

function Signup() {
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
          <h1>Sign Up</h1>
        </div>
        <div className="loginForm">
          <form method="POST" action="/api/register">
            <div className="loginInput">
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email"
              />
            </div>
            <div className="loginInput">
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Username"
              />
            </div>
            <div className="loginInput">
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
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

export default Signup;
