import { use } from "passport";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Home = () => {
  const { loggedin } = useContext(AuthContext);
  const history = useHistory();

  if (loggedin === true) {
    history.push("/dashboard");
  }

  return (
    <div className="main-content">
      <div className="box">
        <h1>Bug Tracker</h1>
        <div>
          <a className="button" href="/login">Login</a>
          <a className="button" href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
