import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducerx/index";
import thunk from "redux-thunk";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE ||compose
const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;