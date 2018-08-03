import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/actionTypes";

// Initial state of this reducer
const initialState = {
  profile: null,
  profiles: null,
  loading: false // loading spinner while profiles are being fectched
};

// every reducer will export a function
// dispatch action to this reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true // show loading spinner
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload, // profile
        loading: false // hide loading spinner
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload, // profile
        loading: false // hide loading spinner
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
