/**
* UserLog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    cash:{type:"integer"},
    kind:{
      type:"string",
      enum:["入金","出金","購入","その他"]
    },
    note:{type:"string"},
    user:{
      model:"User",
    },
  },

  //static method
  addLog: function(user, cash, kind, note, cb){
    User.findOne({or:[{user_id:user}, {id:user}]}).exec(function(err, f){
      if(err){
        if(cb)cb(err);
        return;
      }
      user=f.id;
      UserLog.create({cash:cash, kind:kind, note:note, user:user}).exec(function(err, add){
        if(err){
          UserLog.create({cash:0, kind:"", note:"Error occured!! cash=["+cash+"]kind=["+kind+"]user=["+user+"]"});
          if(cb)cb(err);
          return;
        }
        if(cb)return cb(void 0, add);
      });
    });
  },
  beforeCreate:function(attrs, next){
    if(typeof attrs.kind !== "undefined"){
      if(attrs.kind == 0)attrs.kind="出金";
      else if(attrs.kind == 1)attrs.kind="入金";
      else if(attrs.kind == 2)attrs.kind="購入";
    }
    return next();
  }
};

