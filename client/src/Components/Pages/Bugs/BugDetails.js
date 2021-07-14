import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import BugDelete from "./BugDelete";

const BugDetails = ({ match }) => {
  const [data, setData] = useState({});
  const history = useHistory();
  const { role, loggedin } = useContext(AuthContext);

  if (loggedin === false) {
    history.push("/");
  }

  useEffect(() => {
    fetchbug();
  }, [data]);

  const fetchbug = async () => {
    const id = match.params.id;
    const bug = await axios.get(`http://localhost:5000/bugs/${id}`);
    setData(bug.data);
  };

  const changeStatus = async (status) => {
    const id = match.params.id;
    const post = await axios.put(`http://localhost:5000/bugs/update-status/${id}`, {status: status})
    .then((res) => {fetchbug()});
  }

  return (
    <div className="main-content">
      <div className="box detail">
        <h1>Bug Details</h1>
        <p><span>Title:</span> {data.title}</p>
        <p><span>Description:</span> {data.description}</p>
        <p><span>Category:</span> {data.category}</p>
        <p><span>Priority:</span> {data.priority}</p>
        <p><span>Status:</span> {data.status}</p>
        <p><span>Created At:</span> {data.createdAt}</p>
        <p><span>Posted By:</span> {data.postedBy}</p>
        <p><span>Assigned To:</span> {data.assignedTo}</p>
        {role === "dev" && <>
          <a className="button" onClick={() => {changeStatus("inProgress")}}>Mark as in-progress</a>
        </>}
        {role === "tester" && <>
          <a className="button"  onClick={() => {changeStatus("resolved")}}>Mark as resolved</a>
        </>}
        {role === "admin" && <>
          <a className="button" onClick={() => {changeStatus("inProgress")}}>Mark as in-progress</a>
          <a className="button"  onClick={() => {changeStatus("resolved")}}>Mark as resolved</a>
          <a className="button button-warning" href={`/bugs/update/${match.params.id}`}>
          Update
          </a>
          <a className="button" href={`/bugs/assign/${match.params.id}`}>
          Assign Developer
          </a>
          <BugDelete id={match.params.id} />
        </>}
      </div>
    </div>
  );
};

export default BugDetails;
