import { combineReducers, createStore } from "redux";
import userEventsReducer from "./userEvents";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
