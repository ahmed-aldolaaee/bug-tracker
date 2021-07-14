import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

const BugAdd = () => {
  const [data, setData] = useState({
    title: "",
    category: "functional",
    description: "",
    priority: "low",
  });
  const [message, setMessage] = useState("");
  const {loggedin} = useContext(AuthContext);
  const history = useHistory();

  if (loggedin === false) {
    history.push("/");
  }

  const formhandle = async (e) => {
    e.preventDefault();
    const post = await axios
      .post("http://localhost:5000/bugs/add", data)
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
        <h1>Add Bug</h1>
        {message && (
          <div className="alert alert-danger" role="alert">
            <p className="mb-0">{message}</p>
          </div>
        )}
        <form onSubmit={formhandle}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
            />
          </div>
          <div>
            <label>Catagory:</label>
            <select
              value={data.catagory}
              onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}
            >
              <option value="functional">Functional</option>
              <option value="performance">Performance</option>
              <option value="usability">Usability</option>
              <option value="compatibility">Compatibility</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div>
            <label>Priority:</label>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BugAdd;
