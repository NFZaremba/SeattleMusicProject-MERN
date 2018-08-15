import axios from "axios";
import setAuthToken from "../utils/authToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./actionTypes";

// Register User
// Async data: wait for backend response and then dispatch
export const registerUser = (newUser, success) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(success)
    .catch(err =>
      // dispatch errors to reducer to be accessed from the redux state
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// export const fbLogin = newUser => dispatch => {
//   let fbUser = {
//     email: newUser.email,
//     password: newUser.password
//   };
//   axios
//     .post("/api/users/register", newUser)
//     .then(res => {
//       dispatch(loginUser(fbUser));
//     })
//     .catch(err =>
//       // dispatch errors to reducer to be accessed from the redux state
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// Login User - Get user token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      // localStorage only stores strings
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Extract and decode user data from token - using 'jwt-decode'
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      // dispatch errors to reducer to be accessed from the redux state
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = history => dispatch => {
  history.push("/");
  window.location.href = "/";
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
