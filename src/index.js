import ReactDOM from "react-dom";
import React from 'react';
import HelloWorld from "./component/hello_world/HelloWorld";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<HelloWorld />, wrapper) : false;
