import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const BugAssign = ({ match }) => {
  const [devs, setDevs] = useState([]);
  const history = useHistory();
  const {loggedin} = useContext(AuthContext);
  const id = match.params.id;

  if (loggedin === false) {
    history.push("/");
  }

  useEffect(() => {
    getDevs();
  }, []);

  const getDevs = async () => {
    await axios.get("http://localhost:5000/user/all").then((res) => {
      const users = res.data.users;
      const devUsers = [];
      users.map((x) => {
        if (x.role === "dev") {
          devUsers.push(x);
        }
      });
      setDevs(devUsers);
    });
  };

  const assignUser = async (username) => {
    const post = await axios
      .put(`http://localhost:5000/bugs/assign/${id}`, { username })
      .then(() => {
        console.log("now here");
        history.push("/bugs/all");
      });
  };

  return (
    <div className="main-content">
      <div className="box">
        <h1>Assign user</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Developer Username</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {devs.map((x, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{x.username}</td>
                  <td>
                    <a
                      className="btn btn-warning"
                      onClick={() => assignUser(x.username)}
                    >
                      Assign
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

export default BugAssign;
