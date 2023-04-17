import React from "react";
import logo from "../images/logo.png";
import "../css/header.css";

function Header() {
  return (
    <div className="game_header">
      <img src={logo} alt="" />
    </div>
  );
}

export default Header;
