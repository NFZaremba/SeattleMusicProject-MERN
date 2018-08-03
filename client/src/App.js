import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/authToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/DashBoard";

import { clearCurrentProfile } from "./actions/profileActions";

//if token exists in localStorage - to set token back into auth header if page is refreshed
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user data and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // call setCurrent and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token to logout user out
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // if token is expired then logout User
    store.dispatch(logoutUser());
    // Clear current Profile - set redux state profile to null
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                requiredRole={"user"}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
