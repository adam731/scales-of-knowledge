import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Forgot from "./components/Forgot";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Trivia from "./components/Trivia";
import "./css/main.css";

function App() {
  return (
    <div className="">
      <div className="container spacer layer1">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/trivia" element={<Trivia />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
