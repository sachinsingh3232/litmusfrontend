import React, { useState } from "react";
import "../../style.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import Add from "../../img/addAvatar.png";
function Register() {
  const navigate = useNavigate();
  // const [loader, setLoader] = useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    if(!password || !displayName || !email){
      alert('All fields are mandatory!');
      return;
    }
    if(password.length<8){
      alert('The password should be at least 8 characters long');
      return;
    }
    alert("creating account...");
    const data = { name: displayName, email: email, password: password };
    axios
      .post(`${apiUrl}/app/user/Register`, data,
           { headers: { "Content-Type": "application/json" }, withCredentials: true })
      .then((response) => {
        if (typeof response.data === "object") {
          // alert("account created successfully");
          navigate("/");
        } else alert(response.data);
      })
      .catch((error) => {
        alert("error creating account");
        console.error(error);
      });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logoName">GuessGame</span>
        <span className="logo">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
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
