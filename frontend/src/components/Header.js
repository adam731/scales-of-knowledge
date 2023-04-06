import React from "react";
import logo from "../images/logo.png";
import "../css/header.css";

function Header() {
  return (
    <div className="header">
      <h1>Scales of Knowledge</h1>
      <img src={logo} alt="" />
    </div>
  );
}

export default Header;
