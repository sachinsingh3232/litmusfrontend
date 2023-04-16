import React, { useState } from "react";
import "../../style.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link  } from "react-router-dom";
// import Add from "../../img/addAvatar.png";
function Register() {
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const data = { name: displayName, email: email, password: password };
    axios
      .post(`${apiUrl}/app/user/register`, data)
      .then((response) => {
        console.log(response.data);
        typeof response.data === "object"
          ? navigate("/home")
          : alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Connect</span>
        <span className="logo">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {/* Here we have used label to take the file input using id file and putting the image and not displaying the input of type file */}
          {/* <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="input file" />
            <span>Add an avatar</span>
          </label> */}
          <button>Sign up</button>
        </form>

        <p>
          You do have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
