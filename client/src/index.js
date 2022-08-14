import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";

import { Provider } from "react-redux";
import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducerx";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <CookiesProvider>
            <div className="site-wrap">
               <App />
            </div>
         </CookiesProvider>
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);

reportWebVitals();
