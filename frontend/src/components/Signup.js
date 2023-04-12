import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import Header from "./Header";

function Signup() {
  return (
    <>
      <Header />
      <div className="loginPage">
        <div className="loginTitle">
          <h1>Sign Up</h1>
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
