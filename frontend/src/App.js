import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin.js";
import Dashboard from "./components/Dashboard.js";
import Leaderboard from "./components/Leaderboard.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Trivia from "./components/Trivia.js";
import "./css/main.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";

function App() {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <BrowserRouter>
        <div className="container spacer layer1">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
