global.__CLIENT__ = false;
global.__SERVER__ = true;

import {Server} from "hapi";
import React from "react";
import {renderToString} from "react-dom/server";
import {match, RoutingContext} from "react-router";

import routes from "./routes";

var hostname = process.env.HOSTNAME || 'localhost';

const server = new Server();
server.connection({
  host: hostname,
  port: process.env.PORT || 8000
});

server.route({
  method: "GET",
  path: "/{path*}",
  handler: (request, reply) => {
    const location = request.params.path || "/";
    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        reply(error);
      } else if (redirectLocation) {
        const redirectPath = redirectLocation.pathname + redirectLocation.search;
        reply.redirect(redirectPath);
      } else if (renderProps) {
        reply(body(renderProps));
      } else {
        reply("Not found").code(404);
      }
    });
  }
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

server.start(function () {
  console.info('==> ✅  Server is listening');
  console.info(`Go to ${server.info.uri.toLowerCase()}`);
});