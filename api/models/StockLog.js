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
        StockLog.create({number:0, kind:"", price:0, note:"Error occured!! numder=["+numder+"]price=["+price+"]kind=["+kind+"]stock=["+stock+"]"})
        if(cb)return cb(err);
      }
      if(cb)return cb(void 0, add);
    });
  },
  findTop:function(criteria, cb){
    if(!cb)return;
    StockLog.find(criteria).sort("id DESC").exec(function(err, f){
      if(err)return cb(err);
      else if(f.length)cb(void 0, f[0]);
      else cb({messages:"not found"});
    });
  },
  findOneWeek:function(criteria, cb){
    if(!cb)return;
    var today=new Date();
    var oneWeekAgo=new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    StockLog.find(criteria).where({createdAt:{'>':oneWeekAgo, '<':today}}).exec(function(err, f){
      if(err)return cb(err);
      cb(err, f);
    });
  },
  beforeCreate:function(attrs, next){
    if(typeof attrs.kind !== "undefined"){
      if(attrs.kind == 0)attrs.kind="追加";
      else if(attrs.kind == 1)attrs.kind="入荷";
      else if(attrs.kind == 2)attrs.kind="購入";
      else if(attrs.kind == 3)attrs.kind="過多";
      else if(attrs.kind == 4)attrs.kind="過小";
      else if(attrs.kind == 5)attrs.kind="編集";
      else if(attrs.kind == 6)attrs.kind="その他";
    }
    return next();
  }
};

