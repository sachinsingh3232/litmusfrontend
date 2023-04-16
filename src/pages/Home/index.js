import React from "react";
import { useNavigate } from "react-router";
import "./style.css";
import axios from "axios";
function Home() {
  const navigate = useNavigate();
  // const { state } = useLocation();
  // console.log(state?.data.name);
  const name = localStorage.getItem("name");
  localStorage.setItem("level", JSON.stringify(1));
  localStorage.setItem("timeLeft", JSON.stringify(600));
  localStorage.setItem("life", JSON.stringify(3));
  const apiUrl = process.env.REACT_APP_API_URL;
  const logOut = () => {
    axios
      .get(`${apiUrl}/app/user/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        response.data && navigate("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div>
        <h1 className="">Connect</h1>
        <div className="spanContainer">
          <span>Hello,</span>
          <span>{typeof name === "string" ? name : "Name"}</span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="buttonContainer"
        >
          <button
            onClick={() => {
              navigate("/level");
            }}
            className="button"
          >
            New Game
          </button>
          <button
            onClick={() => {
              navigate("/instruction");
            }}
            className="button"
          >
            Instructions
          </button>
          <button
            onClick={() => {
              navigate("/userLeaderboard");
            }}
            className="button"
          >
            Leaderboard
          </button>
          <button
            onClick={() => {
              logOut();
            }}
            className="button"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
