import { GET_ERRORS } from "../actions/actionTypes";

// Initial state of this reducer
const initialState = {};

// every reducer will export a function
// dispatch action to this reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // action.payload is error response from authActions
      return action.payload;
    default:
      return state;
  }
}
