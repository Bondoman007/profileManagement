import { combineReducers } from "redux";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  profiles: profileReducer,
});

export default rootReducer;
