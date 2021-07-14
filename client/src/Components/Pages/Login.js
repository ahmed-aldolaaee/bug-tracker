import { useState, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const { getloggedin, loggedin } = useContext(AuthContext);

    if (loggedin === true) {
      history.push("/dashboard");
    }

  const formhandle = async (e) => {
    e.preventDefault();
    const data = { email, password };
    console.log(data);
    const post = await axios
      .post("http://localhost:5000/user/login", data)
      .then(() => {
        getloggedin();
        history.push("/dashboard");
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
        <h1>Login</h1>
        {message && (
          <div className="alert alert-danger" role="alert">
            <p className="mb-0">{message}</p>
          </div>
        )}
        <form onSubmit={formhandle}>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
