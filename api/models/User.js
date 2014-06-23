/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{type:"string"},
    user_id:{type:"string", required:true},
    password:{type:"string", required:true},
    grade:{type:"integer"},
    balance:{type:"integer"},
    permission:{type:"integer"},
    limit:{type:"integer"},
    UserLog:{
      collection:"UserLog",
      via:"user"
    },
    Request:{
      collection:"Request",
      via:"User"
    },
    favRequest:{
      collection:"Request",
      via:"favUser"
    }
  },
  beforeCreate:function(attrs, next){
    var bcrypt=require('bcrypt');
    bcrypt.genSalt(10, function(err, salt){
      if(err)return next(err);
      bcrypt.hash(attrs.password, salt, function(err, hash){
        if(err)return next(err);
        attrs.password=hash;
        next();
      });
    });
  },
  beforeUpdate:function(attrs, next){
    var bcrypt=require('bcrypt');
    bcrypt.genSalt(10, function(err, salt){
      if(err)return next(err);
      bcrypt.hash(attrs.password, salt, function(err, hash){
        if(err)return next(err);
        attrs.password=hash;
        next();
      });
    });
  }
};

