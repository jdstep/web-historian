var path = require('path');
var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode = 404;
  var head = header.headers;
  var actions = {
    'GET': function(req, res){
      var pathName = req.url;
      // console.log("PATH NAME IS " + pathName)
      if (req.url==='/index.html' || req.url==='/') {
        header.serveAssets(res, path.join(__dirname, '../web/public/index.html'), 5, 200);
      }else{
        archive.isURLArchived(req.url, res);

        // // call archive.isURLArchived instead of an if statement
        // if(archive.isURLArchived(req.url)){
        //   header.serveAssets(res, path.join(__dirname, '../archives/sites', pathName), 5);
        // }
      }

      statusCode = 200;
      },
    'PUT': function(req, res){
      statusCode = 418; // teapot
      },
    'POST': function(req, res){
      statusCode = 302;
      archive.readListOfUrls(req._postData.url, res);
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
