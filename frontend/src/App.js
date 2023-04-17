import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Leaderboard from "./components/Leaderboard.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Trivia from "./components/Trivia.js";
import "./css/main.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container spacer layer1">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/trivia" element={<Trivia />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
