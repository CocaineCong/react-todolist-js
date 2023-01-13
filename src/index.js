import ReactDOM from "react-dom/client";
import "./assets/base.less"
import Router from './router'
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);