import React from "react";

import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application";

import "./App.css";

export default () => {
    var app = new Application();
    return <BodyWidget app={app} />;
};