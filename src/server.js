const http = require('http');
const url = require('url');
const query = require('querystring');
const handler = require('./handler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const param = query.parse(parsedUrl.query);
  console.log(request.url);
  switch (parsedUrl.pathname) {
    case '/':
      handler.getPage(request, response);
      break;
    case '/style.css':
      handler.getStyle(request, response);
      break;
    case '/success':
      handler.getSuccess(request, response);
      break;
    case '/badRequest':
      handler.getBadRequest(request, response, param);
      break;
    case '/unauthorized':
      handler.getUnauthorized(request, response, param);
      break;
    case '/forbidden':
      handler.getForbidden(request, response);
      break;
    case '/internal':
      handler.getForbidden(request, response);
      break;
    case '/notImplemented':
      handler.getNotImplemented(request, response);
      break;
    case '/notFound':
      handler.getNotFound(request, response);
      break;
    default:
      handler.getNotFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on server at 127.0.0.1:${port}`);
