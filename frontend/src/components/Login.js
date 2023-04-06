import React from "react";
import "../css/login.css";

function Login() {
  return (
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
            <a href="">Sign Up</a>
            <a href="">Forgot Password</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
