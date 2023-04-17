import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './style.scss';
const apiURL=process.env.REACT_APP_API_URL
const Leaderboard = () => {
    const [data, setData] = useState();
    useEffect(() => {
     const getData = async () => {
         try {
            const res = await axios.get(`${apiURL}/app/leaderBoard/findRanking`, {
              headers: { "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true },
              withCredentials: true,
            })
            console.log(res)
            setData(res.data.ranking)
         } catch (e) {
            console.log(e)
         }
      }
        getData();
    }, [])
    
    return (
        <div className="leader">
        <div className="leaderContainer">
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {data&&data.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.score}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
        </div>
      );
    }
    
    export default Leaderboard;