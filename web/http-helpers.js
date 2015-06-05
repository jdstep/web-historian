var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback, code) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  console.log("serveAssets sees the asset as " + asset);
  fs.readFile(asset, {encoding: 'utf8'}, function(err, file) {
    if (err) throw err
      else {
        // res.write(file);
        res.writeHead(code, this.headers);
        res.end(file);
      }
  });
};

exports.collectData = function(req, res) {
  var data = "";
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    data = data.split('=')[1];
    archive.readListOfUrls(data, res);
  })
};



// As you progress, keep thinking about what helper functions you can put here!
