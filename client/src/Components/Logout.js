import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const Logout = () => {
  const { getloggedin } = useContext(AuthContext);

  const loggingout = async () => {
    await axios.get("http://localhost:5000/user/logout");
    getloggedin();
  };

  return (
    <a onClick={loggingout} href="/">
      Logout
    </a>
  );
};

export default Logout;
