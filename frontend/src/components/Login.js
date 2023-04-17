import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFetch } from "../apiCalls/fetch.js";
import "../css/login.css";
import logo from "../images/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  const handleChange = (element, value) => {
    if (element === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(loginFetch(username, password));
  };

  return (
    <>
      <div className="header">
        <h1>Scales of Knowledge</h1>
        <img src={logo} alt="" />
      </div>
      <div className="loginPage">
        <div className="loginTitle">
          <h1>Login</h1>
        </div>
        <div className="loginForm">
          {error && <h1 className="error">Username or Password is invalid.</h1>}
          <form onSubmit={onSubmit}>
            <div className="loginInput">
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Username"
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
            <div className="loginInput">
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
            <div className="loginSubmit">
              <input type="submit" value="Submit" />
            </div>
            <div className="loginButtons">
              <Link
                to="/signup"
                style={{ color: "#3A98B9", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
