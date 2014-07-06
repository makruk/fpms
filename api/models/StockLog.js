/**
* StockLog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    number:{type:"integer"},
    price:{type:"integer"},
    kind:{type:"string"},
    note:{type:"string"},
    stock:{
      model:"Stock"
    }
  },
  addLog:function(stock, number, price, kind, note, cb){
    StockLog.create({number:number,price:price, kind:kind, note:note, stock:stock}).exec(function(err, add){
      if(err){
        UserLog.create({number:0, kind:"", price:0, note:"Error occured!! numder=["+numder+"]price=["+price+"]kind=["+kind+"]stock=["+stock+"]"})
        if(cb)return cb(err);
      }
      if(cb)return cb(void 0, add);
    });
  },
  beforeValidate:function(attrs, next){
    if(attrs.kind){
      if(attrs.kind === 0)attrs.kind="紛失";
      else if(attrs.kind === 1)attrs.kind="入荷";
      else if(attrs.kind === 2)attrs.kind="購入";
    }
  }
};

