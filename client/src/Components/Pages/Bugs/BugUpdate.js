import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

const BugUpdate = ({ match }) => {
  const [data, setData] = useState({
    title: "",
    category: "front-end",
    description: "",
    priority: "low",
    status: "open",
  });
  const [message, setMessage] = useState("");
  const history = useHistory();
  const {loggedin} = useContext(AuthContext);

  if (loggedin === false) {
    history.push("/");
  }

  useEffect(() => {
    fetchbug();
  }, []);

  const fetchbug = async () => {
    const id = match.params.id;
    const bug = await axios.get(`http://localhost:5000/bugs/${id}`);
    setData(bug.data);
  };

  const formhandle = async (e) => {
    e.preventDefault();
    const id = match.params.id;
    const post = await axios
      .put(`http://localhost:5000/bugs/update/${id}`, data)
      .then(() => {
        history.push("/bugs/all");
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.error);
        } else {
          setMessage(err.message);
        }
      });
  };

  return (
    <div className="main-content">
      <div className="box">
        <h1>Bug Update</h1>
        {message && (
          <div className="alert alert-danger" role="alert">
            <p className="mb-0">{message}</p>
          </div>
        )}
        <form onSubmit={formhandle}>
          <div>
            <label>Title</label>
            <input
              value={data.title}
              type="text"
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={data.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
            />
          </div>
          <div>
            <label>Catagory</label>
            <select
              value={data.catagory}
              onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}
            >
              <option value="front-end">Front-end</option>
              <option value="back-end">Back-end</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select
              value={data.priority}
              onChange={(e) => {
                setData({ ...data, priority: e.target.value });
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              value={data.status}
              onChange={(e) => {
                setData({ ...data, status: e.target.value });
              }}
            >
              <option value="open">Open</option>
              <option value="inProgress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BugUpdate;
