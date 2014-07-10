/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name:{type:"string"},
  },
  rebuild:function(cb){
    var tmp={};
    Category.destroy({}).exec(function(err){
      if(err)if(cb)return cb(err);
      Stock.find({}).exec(function(err, found){
        if(err)if(cb)return cb(err);
        for(var i=0;i<found.length;i++){
          (function(i){
            if(found[i].category && tmp[found[i].category]===void 0){
              tmp[found[i].category]=true;
              Category.create({name:found[i].category}).exec(function(err){
                if(err)console.log(err);
              });
            }
          })(i);
        }
      });
    });

  }
};

