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

exports.readListOfUrls = function(){
  fs.readFile(this.paths['list'], function(err){
    if(err) throw err
    console.log('Success!');
  })
};

exports.isUrlInList = function(url){
  var searchList = readListofUrls();
  if(searchList.contains(url)){
    //do something
  }
};

exports.addUrlToList = function(newUrl){
  //how are we recieving data (string, etc)
  var list = [readListOfUrls()];
  list.push(newUrl);
  fs.writeFile(this.paths['list'], function(err){
    if(err) throw err
    console.log('Successssssesss!')
  })
};

exports.isURLArchived = function(url, res){
  //use path from get request to see if the site has been archived

  var pathName = path.join(__dirname, '../archives/sites', url);

  console.log("isURLArchived SEES THIS!!!!!" + pathName);

  var archivedSiteFound = false;

  var getFile =  function() {
    header.serveAssets(res, pathName, 5);
  };

  fs.exists(pathName, function(exists){
    // if !!exists, call the callback
    if (!!exists) {
      getFile();
    }

  });

};

exports.downloadUrls = function(){
};

