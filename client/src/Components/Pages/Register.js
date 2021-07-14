import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("submitter");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const {loggedin} = useContext(AuthContext);

  if (loggedin === true) {
    history.push("/dashboard");
  }

  const formhandle = async (e) => {
    e.preventDefault();
    const data = { username, email, password, role };
    const post = await axios
      .post("http://localhost:5000/user/register", data)
      .then(() => {
        history.push("/login");
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
        <h1>Register</h1>
        {message && (
          <div className="alert alert-danger" role="alert">
            <p className="mb-0">{message}</p>
          </div>
        )}
        <form onSubmit={formhandle}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Select Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="tester">Tester</option>
              <option value="dev">Developer</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
