import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./components/Store/Auth-Context";

// this index.js file is executed first

// the ReactDOM object
ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root") // document object allows you to target elements
  // in this case, we are rendering the App component inside of the root div in Index.html
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
