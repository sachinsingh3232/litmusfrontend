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
  // const [loader,setLoader] = useState()
  const handleClick = (e) => {
    e.preventDefault();
    alert("checking credentials");
    axios
      .post(`${apiUrl}/app/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (typeof response.data === "object") {
          // alert("login successful");
          localStorage.setItem("name", response.data?.data.name);
          navigate("/home", { state: response.data });
        } else alert(response.data);
      })
      .catch((error) => {
        alert("login failed");
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
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
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Are you an Admin? <Link to="/adminlogin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
