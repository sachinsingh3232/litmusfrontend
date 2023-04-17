import React, { useState } from "react";
import "../../style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const data = { email: email, password: pwd };
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/app/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        typeof response.data === "object"
          ? navigate("/home", { state: response.data })
          : alert(response.data);
        typeof response.data === "object" &&
          localStorage.setItem("name", response.data?.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Login</span>
        <form>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Sign in
          </button>
        </form>
        <h4>
          You don't have an account? <Link to="/register">Register</Link>
        </h4>
        <h4>
          Are you an Admin? <Link to="/adminlogin">Login</Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
