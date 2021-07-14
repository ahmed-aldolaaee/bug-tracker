import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Chart from "../Chart";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { loggedin } = useContext(AuthContext);
  const history = useHistory();
  const [data, setData] = useState([
    [0,0,0],
    [0,0,0,0,0],
    [0,0,0]
  ]);

  if (loggedin === false) {
    history.push("/");
  }

  useEffect(() => {
    getbugs();
  }, []);

  const getbugs = async () => {
    const post = await axios.get("http://localhost:5000/bugs/all")
      .then(res => {
        let newData = [
          [0,0,0],
          [0,0,0,0,0],
          [0,0,0]
        ]
        res.data.map(x => {
          if (x.priority === "high") {newData[0][0] = newData[0][0] + 1}
          if (x.priority === "medium") {newData[0][1] = newData[0][1] + 1}
          if (x.priority === "low") {newData[0][2] = newData[0][2] + 1}
          if (x.category === "functional") {newData[1][0] = newData[1][0] + 1}
          if (x.category === "performance") {newData[1][1] = newData[1][1] + 1}
          if (x.category === "usability") {newData[1][2] = newData[1][2] + 1}
          if (x.category === "compatibility") {newData[1][3] = newData[1][3] + 1}
          if (x.category === "security") {newData[1][4] = newData[1][4] + 1}
          if (x.status === "open") {newData[2][0] = newData[2][0] + 1}
          if (x.status === "inProgress") {newData[2][1] = newData[2][1] + 1}
          if (x.status === "resolved") {newData[2][2] = newData[2][2] + 1}
        });
        setData(newData);
      });
  };

  const bugSort = () => {

  }

  return (
    <div className="main-content">
      <div className="box">
        <h1>Dashboard</h1>
        <div className="chart-container">
        <h3 style={{width: 400, marginLeft: 40}}>By Status</h3>
        <h3 style={{width: 400, marginLeft: 40}}>By Category</h3>
        <h3 style={{width: 400, marginLeft: 40}}>By Priority</h3>
        </div>
        <div className="chart-container">
        <Chart type="status" number={data}/>
        <Chart type="catagory" number={data}/>
        <Chart type="priority" number={data}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
