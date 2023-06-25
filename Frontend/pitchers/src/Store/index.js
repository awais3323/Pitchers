import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { gitUserFollowersReducer, gitUserReducer, gitUserReposReducer, userReducer } from "./Reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
  gitUser:gitUserReducer,
  gitUserRepo:gitUserReposReducer,
  gitUserFollower:gitUserFollowersReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
