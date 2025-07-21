import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import userStore from "./store/UserStore";
import languageStore from "./store/LanguageStore";

export const Context = createContext({
  user: null,
  language: languageStore,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{ user: userStore, isAuth: false, language: languageStore }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
