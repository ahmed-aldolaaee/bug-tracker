import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthContexProvider = (props) => {
    const [loggedin, setLoggedin] = useState(undefined);
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    const getloggedin = async () => {
        const loggedinreq = await axios.get("http://localhost:5000/user/loggedin");
        setLoggedin(loggedinreq.data.loggedin);
        if(loggedinreq.data.id) {setUserid(loggedinreq.data.id)}
        if(loggedinreq.data.role) {setRole(loggedinreq.data.role)}
        if(loggedinreq.data.username) {setUserid(loggedinreq.data.username)}
    }

    useEffect(() => {
        getloggedin();
    }, [])

    return (
        <AuthContext.Provider value={{loggedin, userid, username, role, getloggedin}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContexProvider};

