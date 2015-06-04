var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var header = require('../web/http-helpers');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(url, res){
  var holdUrl = url;
  var pathName = path.join(__dirname, '../archives/sites.txt');
  var context = this;
  fs.readFile(pathName, {encoding: 'utf8'}, function(err, data){
      var buffer = data.toString();
      if(err){
       throw err
     }
      context.isUrlInList(holdUrl, buffer, res);
  });
};

exports.isUrlInList = function(url, buffer, res){
  if(buffer.match(new RegExp(url))){
   this.addUrlToList(url, res);
  }
};

exports.addUrlToList = function(newUrl, res){
  //how are we recieving data (string, etc)
  var url = newUrl + '\n'
  console.log("We are trying to append THIS to sites.txt" + newUrl);


  var postFile = function(res){

    header.serveAssets(res, path.join(__dirname, '../web/public/loading.html'), 5, 302);
  }


  var pathName = path.join(__dirname, '../archives/sites.txt');

  console.log("About to call appendFile!");
  fs.writeFile(this.paths.list, url, function(err, data){
    if(err) throw err
      postFile(res);
  })
};

exports.isURLArchived = function(url, res){
  //use path from get request to see if the site has been archived

  var pathName = path.join(__dirname, '../archives/sites', url);


  var archivedSiteFound = false;

  var getFile =  function() {
    header.serveAssets(res, pathName, 5);
  };

  fs.exists(pathName, function(exists){
    if (!!exists) {
      getFile();
    } else {
      res.writeHead(404, header.headers);
      res.end();
    }

  });

};

exports.downloadUrls = function(){
};

