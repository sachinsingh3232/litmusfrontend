import "./Chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";


const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/app/user/findAllUser", { withCredentials: true })
        // console.log(res)
        setData(res.data)
      } catch (e) {
        // console.log(e)
      }
    }
   
    getData();
    
  }, [])
  useEffect(() => {
    const getGraph = async () => {
      for(let i=0;i<data.length;i++){
        const obj={"name":data[i].name,"attempts":data[i].score.length}
        setGraph(graph=>[...graph,obj])
      }
    }
    
    data&&getGraph();
    // setData([])
    // console.log(graph)
  }, [data])
  
  
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={graph}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="attempts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="attempts"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#attempts)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;