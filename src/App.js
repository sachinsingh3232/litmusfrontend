import React from "react";
import Login from "./pages/Login";
import "./App.css";
import SignupForm from "./pages/Signup";
import Home from "./pages/Home";
import Level from "./pages/Level";
import AdminHome from "./pages/AdminHome/AdminHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Users from "./pages/Users/Users";
import Leaderboard from "./pages/LeaderBoard";
import  UserLeaderBoard from "./pages/UserLeaderBoard/index";
import Instruction from "./pages/Instruction/Instruction";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/level" element={<Level />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Adminleaderboard" element={<Leaderboard />} />
          <Route path="/userLeaderboard" element={<UserLeaderBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
