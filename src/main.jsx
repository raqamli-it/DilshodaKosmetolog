import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import "./main.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <Toaster position="top-right" richColors />
    <App />
  </GlobalContextProvider>
);
