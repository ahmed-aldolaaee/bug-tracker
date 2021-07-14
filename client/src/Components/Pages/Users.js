import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Users = () => {
  const {loggedin, role} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    const post = await axios.get("http://localhost:5000/user/all").then((res) => {
      setUsers(res.data.users);
    });

  };

  const formhandle = async (id, role) => {
    const newusers = users.map((x, i) => {
        if (x._id === id) {x.role = role}
        return x;
    })
    setUsers(newusers);
    const data = {id, role}
    axios.put("http://localhost:5000/user/updaterole", data)
  }

  const updaterole = async (id) => {
    
  }

  if (loggedin == false) {
    history.push("/");
  }

  return (
    <div className="main-content">
      <div className="box">
        <h1>Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((x, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{x.username}</td>
                  <td>{x.email}</td>
                  <td>
                    <select value={x.role} onChange={(e) => {formhandle(x._id, e.target.value)}}>
                      <option value="dev">Developer</option>
                      <option value="tester">Tester</option>
                      <option value="admin">Admin</option>
                    </select>
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

export default Users;
