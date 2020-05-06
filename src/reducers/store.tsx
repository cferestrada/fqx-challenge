import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ListsState } from "./lists/types";
import listsReducer from "./lists/reducer";

export type RootState = {
  lists: ListsState;
};

const rootReducer = combineReducers({
  lists: listsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
