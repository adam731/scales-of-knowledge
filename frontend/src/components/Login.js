import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import Header from "./Header";

function Login() {
  return (
    <>
      <Header />
      <div className="loginPage">
        <div className="loginTitle">
          <h1>Login</h1>
        </div>
        <div className="loginForm">
          <form action="">
            <div className="loginInput">
              <input
                type="text"
                name="name"
                id="name"
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
              <Link
                to="/signup"
                style={{ color: "#3A98B9", textDecoration: "none" }}
              >
                Sign Up
              </Link>
              <Link
                to="/forgot"
                style={{ color: "#3A98B9", textDecoration: "none" }}
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
