/**
* Stock.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{type:"string",
    required: true
    },
    price:{type:"integer",
    required: true,
    min:1
    },
    number:{type:"integer",
    required: true,
    min:0
    },
    photo:{type:"binary"},
    category:{type:"string"},
    StockLog:{
      collection:"StockLog",
      via:"stock"
    },
    validation_messages: {
      name: {
        required: 'you have to specify a name or else'
      }
    }
  },
  afterUpdate:function(record, next){
    Category.rebuild(function(err){console.log(err);});
    return next();
  },
  afterCreate:function(record, next){
    Category.rebuild(function(err){console.log(err);});
    return next();
  },
  afterDestroy:function(record, next){
    Category.rebuild(function(err){console.log(err);});
    return next();
  }
};

