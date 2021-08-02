import React from "react";
import ReactDOM from "react-dom";
import "./estilos/index.css";
import Rotas from "./rotas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <Rotas />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
