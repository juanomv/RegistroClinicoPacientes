import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import Main from "./pages/Main";
import PrivateRoute from "./componets/PrivateRoute";
import NoPage from "./pages/NoPage";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} >{!localStorage.getItem('Token')?<Login/>:<Redirect to="/Dashboard/"/>}</Route>
        <Route path='/login' >{!localStorage.getItem('Token')?<Login/>:<Redirect to="/Dashboard/1"/>}</Route>
        <PrivateRoute exact path="/Dashboard/:id" Component={Main} />
        <PrivateRoute exact path="/Dashboard/" Component={Main} />
        <Route path={'/*'} component={NoPage}/>
      </Switch>
    </Router>
  );
};

export default App;
