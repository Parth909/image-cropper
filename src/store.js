import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// there will be multiple reducers combined in the root reducer
import rootReducer from "./reducers"; // from index.js

const initialState = {};

const middleware = [thunk];

// *createStore accepts one reducer* so all the reducers are combined in the object in index.js
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
