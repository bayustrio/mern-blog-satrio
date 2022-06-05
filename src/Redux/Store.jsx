import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Auth from "./Reducer/Auth";
import Story from "./Reducer/Story";
import Comments from "./Reducer/Comments";
import User from "./Reducer/User";
import Alert from "./Reducer/Alert";
export const rootReducer = combineReducers({
  Auth,
  Story,
  Comments,
  Alert,
  User,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
