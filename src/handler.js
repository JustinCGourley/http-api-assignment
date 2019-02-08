const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const sendResponse = (request, response, status, type, content) => {
  response.writeHead(status, { 'Content-Type': type });
  switch (type) {
    case 'application/json':
      response.write(JSON.stringify(content));
      break;
    case 'text/xml':
      response.write(content);
      break;
    default:
      response.write(JSON.stringify(content));
      break;
  }
  response.end();
};

const getPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getSuccess = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    sendResponse(request, response, 200, request.headers.accept, '<response><message>This is a successful response.</message><id>Success</id></response>');
  } else if (request.headers.accept === 'application/json') {
    sendResponse(request, response, 200, request.headers.accept, { message: 'This is a successful response.', id: 'Success' });
  } else {
    sendResponse(request, response, 200, 'application/json', { message: 'This is a successful response.', id: 'Success' });
  }
};

const getBadRequest = (request, response, params) => {
  if (request.headers.accept === 'text/xml') {
    if (params.valid === 'true') {
      sendResponse(request, response, 200, request.headers.accept, '<response><message>This request has the required parameters.</message></response>');
    } else {
      sendResponse(request, response, 400, request.headers.accept, '<response><message>Missing valid query parameter set to true.</message><id>Bad Request</id></response>');
    }
  } else if (request.headers.accept === 'application/json') {
    if (params.valid === 'true') {
      sendResponse(request, response, 200, request.headers.accept, { message: 'This request has the required parameters.' });
    } else {
      sendResponse(request, response, 400, request.headers.accept, { message: 'Missing valid query parameter set to true.', id: 'Bad Request' });
    }
  } else if (params.valid === 'true') {
    sendResponse(request, response, 200, 'application/json', { message: 'This request has the required parameters.' });
  } else {
    sendResponse(request, response, 400, 'application/json', { message: 'Missing valid query parameter set to true.', id: 'Bad Request' });
  }
};

const getUnauthorized = (request, response, params) => {
  if (request.headers.accept === 'text/xml') {
    if (params.loggedIn === 'yes') {
      sendResponse(request, response, 200, request.headers.accept, '<response><message>You have successfully viewed the content.</message></response>');
    } else {
      sendResponse(request, response, 401, request.headers.accept, '<response><message>Missing loggedIn query parameter set to yes.</message><id>Unauthorized</id></response>');
    }
  } else if (request.headers.accept === 'application/json') {
    if (params.loggedIn === 'yes') {
      sendResponse(request, response, 200, request.headers.accept, { message: 'You have successfully viewed the content.' });
    } else {
      sendResponse(request, response, 401, request.headers.accept, { message: 'Missing loggedIn query parameter set to yes.', id: 'Unauthorized' });
    }
  } else if (params.loggedIn === 'yes') {
    sendResponse(request, response, 200, 'application/json', { message: 'You have successfully viewed the content.' });
  } else {
    sendResponse(request, response, 401, 'application/json', { message: 'Missing loggedIn query parameter set to yes.', id: 'Unauthorized' });
  }
};

const getForbidden = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    sendResponse(request, response, 403, request.headers.accept, '<response><message>You do not have access to this content.</message><id>Forbidden</id></response>');
  } else if (request.headers.accept === 'application/json') {
    sendResponse(request, response, 403, request.headers.accept, { message: 'You do not have access to this content.', id: 'Forbidden' });
  } else {
    sendResponse(request, response, 403, 'application/json', { message: 'You do not have access to this content.', id: 'Forbidden' });
  }
};

const getInternalError = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    sendResponse(request, response, 500, request.headers.accept, '<response><message>Internal server error. Something went wrong.</message><id>Internal Server Error</id></response>');
  } else if (request.headers.accept === 'application/json') {
    sendResponse(request, response, 500, request.headers.accept, { message: 'Internal server error. Something went wrong.', id: 'Internal Server Error' });
  } else {
    sendResponse(request, response, 500, 'application/json', { message: 'Internal server error. Something went wrong.', id: 'Internal Server Error' });
  }
};

const getNotImplemented = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    sendResponse(request, response, 501, request.headers.accept, '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>Not Implemented</id></response>');
  } else if (request.headers.accept === 'application/json') {
    sendResponse(request, response, 501, request.headers.accept, { message: 'A get request for this page has not been implemented yet. Check again later for updated content.', id: 'Not Implemented' });
  } else {
    sendResponse(request, response, 501, 'application/json', { message: 'A get request for this page has not been implemented yet. Check again later for updated content.', id: 'Not Implemented' });
  }
};

const getNotFound = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    sendResponse(request, response, 404, request.headers.accept, '<response><message>The page you are looking for was not found.</message><id>Resource Not Found</id></response>');
  } else if (request.headers.accept === 'application/json') {
    sendResponse(request, response, 404, request.headers.accept, { message: 'The page you are looking for was not found.', id: 'Resource Not Found' });
  } else {
    sendResponse(request, response, 404, 'application/json', { message: 'The page you are looking for was not found.', id: 'Resource Not Found' });
  }
};

module.exports.getPage = getPage;
module.exports.getStyle = getStyle;
module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternalError = getInternalError;
module.exports.getNotImplemented = getNotImplemented;
module.exports.getNotFound = getNotFound;
