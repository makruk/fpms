/**
 * PhotosController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs=require('fs');
var path=require('path');
module.exports = {
  download:function(req, res){
    var file=req.param('file');
    file=path.basename(file);
    var filePath=path.resolve(sails.config.appPath, "photos", file);
    fs.exists(filePath, function(e){
      if(e)return fs.createReadStream(filePath).pipe(res);
      else return res.notFound();
    });
  }
};

