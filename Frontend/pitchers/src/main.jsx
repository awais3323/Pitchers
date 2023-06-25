import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Provider as ReduxProvider} from "react-redux";
import store from "./Store/index.js";

const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider value={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </Provider>
  </React.StrictMode>
);
