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
  payment:function(id, cash, kind, note, cb){
    if(cash == 0)return;
    var user, strkind;
    if(typeof id === 'string'){
      User.findOne({user_id:id}).exec(function(err, f){
        user=f;
      });
    }
    else{
      User.findOne({id:id}).exec(function(err, f){
        user=f;
      });
    }
    if(kind == 1){
      user.balance+=parseInt(cash);
      strkind="入金";
    }
    else if(kind == 0){
      user.balance-=parseInt(cash);
      strkind="出金";
    }
    else if(kind == 2){
      user.balance+=parseInt(cash);
      strkind="購入";
    }
    User.update({id:user.id}, {balance:user.balance}).exec(function(err, u){
      if(err){
        if(cb)cb(err);
        UserLog.addLog(user.id, cash, kind, "Failed by DB error.["+note+"]", cb);
      }
      else{
        UserLog.addLog(user.id, cash, strkind, note, cb);
      }
    });
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
    if(attrs.password === void 0){
      return next();
    }
    bcrypt.genSalt(10, function(err, salt){
      if(err)return next(err);
      bcrypt.hash(attrs.password, salt, function(err, hash){
        if(err)return next(err);
        attrs.password=hash;
        return next();
      });
    });
  }
};

