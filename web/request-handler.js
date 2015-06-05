var path = require('path');
var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers');
var url = require('url');
var qs = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode = 404;
  var head = header.headers;
  var actions = {
    'GET': function(req, res){
      var pathName = req.url;
      // console.log("PATH NAME IS " + pathName)
      if (req.url==='/index.html' || req.url==='/') {
        header.serveAssets(res, path.join(archive.paths.siteAssets, '/index.html'), 5, 200);
      } else if (req.url === "/styles.css") {
        header.serveAssets(res, path.join(archive.paths.siteAssets, '/styles.css'), 5, 200);
      } else if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
      } else{
        archive.isURLArchived(req.url, res, 200);
      }
    },
    'POST': function(req, res){
      statusCode = 302;
      // console.log(req._postData.url)
      req.url = req.url || req._postData.url;
      console.log("POST DATA SEES THIS AS THE URL: " + req.url)
      header.collectData(req, res);
      },

    'PUT': function(req, res){
      statusCode = 418; // teapot
      },
    'DELETE': function(req, res){
      statusCode = 402; // payment required
      },
    'OPTIONS': function(req, res){
      statusCode = 200;
      }
  };



  actions[req.method](req, res);



  // res.writeHead(statusCode, head)
  // res.end(archive.paths.list);
};
