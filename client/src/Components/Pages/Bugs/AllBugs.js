import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const AllBugs = () => {
  const [bugs, setBugs] = useState([]);

  const { loggedin } = useContext(AuthContext);
  const history = useHistory();

  if (loggedin === false) {
    history.push("/");
  }

  useEffect(() => {
    displayBugs();
  }, [bugs]);

  const displayBugs = () => {
    axios.get("http://localhost:5000/bugs/all").then((res) => {
      const bugArray = res.data;
      setBugs(bugArray);
    });
  };

  return (
    <div className="main-content">
      <div className="box">
        <h1>All Bugs</h1>
        <a className="btn btn-primary m-2" href="/bugs/add">
          Add Bug
        </a>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Posted By</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Options</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((x, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{x.title}</td>
                  <td>{x.category}</td>
                  <td>{x.postedBy}</td>
                  <td>{x.priority}</td>
                  <td>{x.status}</td>
                  <td>{x.createdAt}</td>
                  <td>{x.assignedTo}</td>
                  <td>
                    <a className="btn btn-success" href={`/bugs/${x._id}`}>
                      Details/Options
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBugs;
