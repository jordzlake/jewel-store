import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  itemCreateReducer,
  itemDeleteReducer,
  itemDetailReducer,
  itemListReducer,
  itemUpdateReducer,
} from "./Reducers/ItemReducers";
import { userLoginReducer } from "./Reducers/UserReducers";

const reducer = combineReducers({
  itemList: itemListReducer,
  userLogin: userLoginReducer,
  itemDelete: itemDeleteReducer,
  itemDetail: itemDetailReducer,
  itemCreate: itemCreateReducer,
  itemUpdate: itemUpdateReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
