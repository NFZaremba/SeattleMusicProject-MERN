import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import errorReducer from "./ErrorReducer";
import profileReducer from "./ProfileReducer";
// import postReducer from "./postReducer";

// Combine all the reducers into an object to be used
export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  profile: profileReducer
  //   post: postReducer
});
