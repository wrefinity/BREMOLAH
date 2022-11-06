import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { compose, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducerx";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <div className="site-wrap">
          {/* <App /> */}
          <Router>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
        </div>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
