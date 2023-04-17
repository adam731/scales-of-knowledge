import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Logout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return <Button onClick={onLogout}>Logout</Button>;
}

export default Logout;
