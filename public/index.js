const http = require('http');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;

const readAll = require('../handlers/readAll');
const read = require('../handlers/read');
const create = require('../handlers/create');
const update = require('../handlers/update');
const del = require('../handlers/delete');
const createComment = require('../handlers/createComment');
const deleteComment = require('../handlers/deleteComment');
const log = require('../handlers/log');
const static = require('../handlers/static');

const handlers = {
  '/api/log' : log.getLog,
  '/api/articles/readall' : readAll.readall,
  '/api/articles/read' : read.read,
  '/api/articles/create' : create.create,
  '/api/articles/update' : update.update,
  '/api/articles/delete' : del.del,
  '/api/comments/create' : createComment.createComment,
  '/api/comments/delete' : deleteComment.deleteComment,
  '/' : static.sendStatic,
  '/index.html' : static.sendStatic,
  '/form.html' : static.sendStatic,
  '/app.js' : static.sendStatic,
  '/index.js' : static.sendStatic,
  '/form.js' : static.sendStatic,
  '/site.css' : static.sendStatic,
  '/favicon.ico' : static.sendStatic,
  '/jquery.js' : static.sendStatic
};

const server = http.createServer((req, res) => {
  const handler = getHandler(req.url);
  console.log(handler);
  console.log(req.method);
  console.log(req.url);
  if (isStatic(req)){
    handler(req,res);
  }
  else{
    parseBodyJson(req, (err, payload) => {
      console.log('POST');
      handler(req, res, payload, (err, result) => {
        if (err) {
          res.statusCode = err.code;
          res.setHeader('Content-Type', 'application/json');
          res.end( JSON.stringify(err) );
  
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      });
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return handlers[url] || notFound;
}


function notFound(req, res, payload, cb) {
  cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
  let body = [];

  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();

    let params = JSON.parse(body);

    cb(null, params);
  });
}

function isStatic(request){
  return Boolean(path.extname(request.url)) || request.url === '/';
}