import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Dashboard from "./Components/Pages/Dashboard";
import AllBugs from './Components/Pages/Bugs/AllBugs';
import BugDetails from './Components/Pages/Bugs/BugDetails';
import BugUpdate from './Components/Pages/Bugs/BugUpdate';
import BugAdd from './Components/Pages/Bugs/BugAdd';
import Users from './Components/Pages/Users';
import BugAssign from "./Components/Pages/Bugs/BugAssign";

function App() {
  return (
    <Router>
      <div className="wrapper">
      <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/bugs/all" component={AllBugs} />
          <Route path="/bugs/add" component={BugAdd} />
          <Route exact path="/bugs/:id" component={BugDetails} />
          <Route path="/bugs/update/:id" component={BugUpdate} />
          <Route path="/bugs/assign/:id" component={BugAssign} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
