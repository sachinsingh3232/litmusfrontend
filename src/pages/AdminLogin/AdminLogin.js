import React, { useState } from "react";
import "./AdminLogin.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheck = () => {
    // event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    // Here, you would need to implement actual authentication logic and handle success/failure accordingly
    const authenticated = true; // replace with actual authentication logic

    if (authenticated) {
      // redirect to admin dashboard or wherever you want to take the user after login
    } else {
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const data = { email: email, password: password };
  const handleLogin = (e) => {
    e.preventDefault();
    handleCheck();
    axios
      .post(`${apiUrl}/app/user/login`, data, {
        headers: { "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        typeof response.data === "object" && response.data.data.role === "Admin"
          ? navigate("/adminhome")
          : response.data.data && response.data.data.role === "user"
          ? alert("You are not an admin")
          : alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Go back to user <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
