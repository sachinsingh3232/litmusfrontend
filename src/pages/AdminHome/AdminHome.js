import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminHome.scss";
import Widget from "../../components/Widget/Widget";
import Chart from "../../components/Chart/Chart"
import axios from "axios";
import { useEffect, useState } from "react";
const apiURL=process.env.REACT_APP_API_URL
const AdminHome = () => {
  const [data, setData] = useState();
  const [users, setUsers] = useState(0);
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${apiURL}/app/user/findAllUser`, {
        headers: { "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true },
        withCredentials: true,
      });
      console.log(res.data);
      setData(res.data);
    };
    getData();
  }, []);
  useEffect(() => {
    const getDetails = () => {
      let x = 0;
      for (let i = 0; i < data.length; i++) {
        x = x + data[i].score.length;
      }
      setAttempts(x);
      setUsers(data.length);
    };
    data && getDetails();
  }, [data]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" users={users} attempts={attempts} />
          <Widget type="attempts" users={users} attempts={attempts} />
          <Widget type="earning" />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Attempts of each user Graph" aspect={2 / 0.6} />
        </div>
        {/* <div className="listContainer"> */}
        {/* <div className="listTitle">Latest Transactions</div> */}
        {/* <Table /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminHome;
