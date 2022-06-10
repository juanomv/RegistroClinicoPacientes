import React from 'react'
import {Route,Redirect} from 'react-router-dom'
function PrivateRoute({Component,...rest}) {
  return (
    <Route {...rest}>{localStorage.getItem("Token")?<Component/>:<Redirect to="/login"/>}</Route>
  )
}

export default PrivateRoute