global.__CLIENT__ = false;
global.__SERVER__ = true;

import React from "react";
import {renderToString} from "react-dom/server";
import {match, RoutingContext} from "react-router";
import express from "express";
import piping from "piping";
import routes from "./routes";


if (piping({hook: true})) {
  const app = express();

  app.get("*", (req, res) => {
    const location = req.originalUrl || "/";
    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(505).send(error);
      } else if (redirectLocation) {
        const redirectPath = redirectLocation.pathname + redirectLocation.search;
        res.redirect(redirectPath);
      } else if (renderProps) {
        res.send(body(renderProps))
      } else {
        res.status(404).send("Not found");
      }
    });
  });

  app.listen(3000, 'localhost', error => {
    if (error) {
      console.log(error);
      return;
    }
    console.log('Listening at http://localhost:3000');
  });



  function body(renderProps) {
    var reactString = renderToString(<RoutingContext {...renderProps}/>);
    const output = `<!doctype html>
				<html lang='en-us'>
					<head>
						<meta charset='utf-8'>
						<title>react universal example</title>
					</head>
					<body>
						<div id="app">${reactString}</div>
						<script src="http://localhost:8080/assets/bundle.js"></script>
					</body>
				</html>`;
    return output;
  }

}