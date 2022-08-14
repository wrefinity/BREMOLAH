import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Fragment } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Router from "./Router";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router />
    </Fragment>
  );
}

export default App;
