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
import CreateWizard from "./components/dashboard/createWizard";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profile/Profiles";
import Posts from "./components/post/Posts";
import CommentPost from "./components/comment/CommentPost";
import CommingSoon from "./components/users/CommingSoon";
import NotFound from "./components/users/NotFound";

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
    window.location.href = "/";
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
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/events" component={CommingSoon} />
              <Route exact path="/artist" component={CommingSoon} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                requiredRole={"user"}
              />
              <PrivateRoute
                exact
                path="/createWizard"
                component={CreateWizard}
                requiredRole={"user"}
              />
              <PrivateRoute
                exact
                path="/feed"
                component={Posts}
                requiredRole={"user"}
              />
              <PrivateRoute
                exact
                path="/post/:id"
                component={CommentPost}
                requiredRole={"user"}
              />
              <Route exact component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
