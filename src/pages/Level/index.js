import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
// import { localStorage } from "window";
import {
  BsFillHeartFill,
  BsFillHeartbreakFill,
  BsLightbulbFill,
} from "react-icons/bs";
import { useNavigate } from "react-router";

function Level() {
  const inputStyles = {
    fontSize: "1.2rem",
    padding: "0.5rem 1rem",
    border: "none",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    margin: "0.5rem",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    outline: "none",
  };
  const buttonStyles = {
    backgroundColor: "#27ae60",
    color: "white",
    // width: 50,
    padding: 15,
    // padding: "0.5rem 1rem",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    cursor: "pointer",
  };
  console.log(parseInt(localStorage.getItem("timeLeft")));
  const [timeLeft, setTimeLeft] = useState(
    parseInt(localStorage.getItem("timeLeft"))
  );
  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  const [level4, setLevel4] = useState(0);
  const [life, setLife] = useState(parseInt(localStorage.getItem("life")));
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(parseInt(localStorage.getItem("level")));
  const [data, setData] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  // console.log(localStorage.getItem("level"));
  const getData = () => {
    // const LSlevel = 1;

    const LSlevel = localStorage.getItem("level");
    setLevel(parseInt(LSlevel));
    // console.log(LSlevel);
    axios
      .post(
        `${apiUrl}/app/image/fetchLevelImages`,
        { level: LSlevel },
        {
          header: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log(response.data);
        typeof response.data === "object"
          ? setData(response.data)
          : alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkAnswer = () => {
    console.log(typeof timeLeft);

    // localStorage.setItem("timeLeft", timeLeft);
    const LStimeLeft = parseInt(localStorage.getItem("timeLeft"));
    // console.log(localStorage.getItem(timeLeft));
    console.log(LStimeLeft);
    setTimeLeft(parseInt(LStimeLeft));
    level === 1 && setLevel1(600 - LStimeLeft);
    level === 2 && setLevel2(600 - LStimeLeft - level1);
    level === 3 && setLevel3(600 - LStimeLeft - level1 - level2);
    level === 4 && setLevel4(600 - LStimeLeft - level1 - level2 - level3);

    const data = {
      ans: answer,
      level: level,
      level1: 600 - LStimeLeft,
      level2: level2,
      level3: level3,
      level4: level4,
    };
    axios
      .post(`${apiUrl}/app/user/lastData`, data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(timeLeft);
        res.data?.message === false &&
          localStorage.setItem("life", JSON.stringify(life - 1));
        res.data?.message === false && setLife(life - 1);
        res.data?.message === true && navigate("/home");
        res.data.message === undefined && setData(res.data);
        res.data.message === undefined && setLevel(level + 1);
        res.data.message === undefined &&
          localStorage.setItem("level", JSON.stringify(level + 1));
        // res.data.message === undefined &&
        // localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
        // res.data?.message === true && setLevel(1);
      })
      .catch((e) => console.log(e));
  };
  const deadendApiCall = () => {
    axios
      .post(`${apiUrl}/app/user/deadEnd`, {level: level,level1: level1,level2: level2 ,level3: level3,level4:level4}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/home");
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (
      parseInt(localStorage.getItem("timeLeft")) === 0 ||
      parseInt(localStorage.getItem("life")) === 0
    ) {
      deadendApiCall();
      console.log("deadendReached");
    }
  }, [timeLeft, life]);
  useEffect(() => {
    if (timeLeft === 0) {
      // do something when timer ends
      console.log("Timer ended");
      return;
    }

    // update timer every second
    const timerId = setInterval(() => {
      localStorage.setItem("timeLeft", timeLeft);
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // cleanup timer on component unmount
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div className="container">
      <div className="headingContainer">
        <div className="level">
          <h4>Level {level}</h4>
        </div>
        <div className="heading">
          <h1>Connect</h1>
        </div>
        <div className="deadendContainer">
          <div className="lifeContainer">
            {life >= 1 ? (
              <BsFillHeartFill color="red" size={28} className="icon" />
            ) : (
              <BsFillHeartbreakFill color="red" size={28} className="icon" />
            )}
            {life >= 2 ? (
              <BsFillHeartFill color="red" size={28} className="icon" />
            ) : (
              <BsFillHeartbreakFill color="red" size={28} className="icon" />
            )}
            {life >= 3 ? (
              <BsFillHeartFill color="red" size={28} className="icon" />
            ) : (
              <BsFillHeartbreakFill color="red" size={28} className="icon" />
            )}

            {/* <BsFillHeartFill color="red" size={28} className="icon" /> */}
          </div>
          <div
            className="hintContainer"
            onClick={() => {
              alert(data.hint);
            }}
          >
            <BsLightbulbFill color="#CCCC00" size={25} />
          </div>
          <p>{timeLeft}</p>
        </div>
      </div>
      <div className="pics">
        {data.images?.map((image) => {
          return (
            <div className="pic">
              <img src={image} alt="Loading......." className="image" />
            </div>
          );
        })}
      </div>
      <div>
        <div>
          <p>Can you identify the common word that connects these images?</p>
        </div>
        <div className="input">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter text here"
            style={inputStyles}
            autoComplete="off"
          />
          <button
            style={buttonStyles}
            onClick={() => {
              checkAnswer();
            }}
          >
            {/* <FaArrowRight style={iconStyles} /> */}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Level;
