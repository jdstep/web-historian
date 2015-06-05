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
  var pathName = this.paths.list;
  var context = this;
  fs.readFile(pathName, {encoding: 'utf8'}, function(err, data){
      var buffer = data.toString().split('\n');
      if(err){
       throw err
     }
       // console.log(buffer)
      context.isUrlInList(url, buffer, res);
  });
};

exports.isUrlInList = function(url, sites, res){
  console.log(" WE ARE ASSUMING THAT " + url + "IS IN " + sites);
  if(sites.indexOf(url) === -1){
  console.log("Sites DONT contains the url!");
   this.addUrlToList(url, res);
  }else{
    this.isURLArchived(url, res, 302);
    //coming soon to a code-base near you!
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

  console.log("About to call appendFile and add " + url);

  console.log("we are going to append the file: " + this.paths.list);
  fs.appendFile(this.paths.list, url, function(err, data){
    if(err) throw err
      fs.readFile(exports.paths.list, {encoding: 'utf8'}, function(err, data){
          var buffer = data.toString().split('\n');
          console.log("the sites.txt after appending is: " + buffer);
      });
    postFile(res);
  })
};

exports.isURLArchived = function(url, res, code){
  //use path from get request to see if the site has been archived

  var pathName = path.join(__dirname, '../archives/sites', url);

  var getFile =  function(code, pageToLoad) {
    header.serveAssets(res, pathName, 5, code);
  };

  fs.exists(pathName, function(exists){
    if (!!exists) {
      getFile(code, pathName);
    } else {
      getFile(code, path.join(__dirname, '../web/public/loading.html'));
      // res.writeHead(404, header.headers);
      // res.end();
    }

  });

};

exports.downloadUrls = function(){
};

