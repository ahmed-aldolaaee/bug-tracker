import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Logout from './Logout';

const Nav = () => {
  const { loggedin, userid, role } = useContext(AuthContext);

  return (
      <div className="navigation">
        <h2>BUG TRACKER</h2>
        <ul>
          {loggedin === false && <>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>}
          {loggedin === true && <>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/bugs/all">Bugs</a></li>
            {role === 'admin' && <><li><a href="/users">Users</a></li></> }
            <li><Logout /></li>
          </>}
        </ul>
      </div>
  );
};

export default Nav;
