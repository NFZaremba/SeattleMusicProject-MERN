import axios from "axios";
import { logoutUser } from "./authActions";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from "./actionTypes";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then(res =>
      // if profile exists, pass the profile data
      dispatch({
        type: GET_PROFILE,
        payload: res.data // the actual profile
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {} // return empty object if there is no profile
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      // if profile exists, pass the profile data
      dispatch({
        type: GET_PROFILE,
        payload: res.data // the actual profile
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null // return  null if there is no profile
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add favoritemusic
export const addMusic = (expData, history) => dispatch => {
  axios
    .post("/api/profile/favoritemusic", expData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add band
export const addBand = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/band", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

// Delete favoritemusic
export const deleteMusic = id => dispatch => {
  axios
    .delete(`/api/profile/favoritemusic/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete band
export const deleteBand = id => dispatch => {
  axios
    .delete(`/api/profile/band/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
  axios
    .delete("/api/profile")
    .then(res =>
      // deletes token along with account
      dispatch(logoutUser())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading spinner
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile - set to null
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
