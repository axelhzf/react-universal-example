global.__CLIENT__ = true;
global.__SERVER__ = false;

import babelPolyfill from "babel-polyfill";
import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute} from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory'

import routes from "./routes"

function init() {
  const history = createBrowserHistory();
  var element = <Router history={history} routes={routes}/>;
  var mountNode = document.getElementById("app");
  ReactDom.render(element, mountNode);
}

init();