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
    kind:{
      type:"string",
      enum:["追加","入荷","購入","過少","過多","編集","その他"]
    },
    note:{type:"string"},
    stock:{
      model:"Stock"
    }
  },
  addLog:function(stock, number, price, kind, note, cb){
    StockLog.create({number:number,price:price, kind:kind, note:note, stock:stock}).exec(function(err, add){
      if(err){
        StockLog.create({number:0, kind:"", price:0, note:"Error occured!! number=["+number+"]price=["+price+"]kind=["+kind+"]stock=["+stock+"]"})
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
};

