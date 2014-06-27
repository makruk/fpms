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
  addLog:function(stock, number, price, kind, note){
    StockLog.create({numder:numder,price:price, kind:kind, note:note, stock:stock}).exec(function(err, add){
      if(err){
        UserLog.create({numder:0, kind:"", price:0, note:"Error occured!! numder=["+numder+"]price=["+price+"]kind=["+kind+"]stock=["+stock+"]"})
      }
    });
  }
};

