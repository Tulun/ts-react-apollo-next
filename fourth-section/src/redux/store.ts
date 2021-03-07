import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userEventsReducer from "./userEvents";
import recorderReducer from "./recorder";

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
