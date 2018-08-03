import isEmpty from "../validation/IsEmpty";
import { SET_CURRENT_USER } from "../actions/actionTypes";

// Initial state of this reducer
const initialState = {
  isAuthenticated: false,
  user: {}
};

// every reducer will export a function
// dispatch action to this reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // check to see if action.payload is an empty object
        user: action.payload
      };
    default:
      return state;
  }
}
