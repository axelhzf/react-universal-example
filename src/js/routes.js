import React from "react";
import {Router, Route, IndexRoute} from "react-router";

import App from "./containers/App";
import Homepage from "./containers/Homepage"
import About from "./containers/About"

export default (<Route path="/" component={App}>
  <IndexRoute component={Homepage}/>
  <Route path="/about" component={About}/>
</Route>);