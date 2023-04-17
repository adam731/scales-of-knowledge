import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="">
      <a className="logout" onClick={onLogout}>
        Logout
      </a>
    </div>
  );
}

export default Logout;
