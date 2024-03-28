import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./AuthReducer/reducer";
import { bookReducer } from "./BookReducer/reducer";


const rootReducer = combineReducers({
  authReducer,
  bookReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
