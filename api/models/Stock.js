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
    required: true
    },
    number:{type:"integer",
    required: true
    },
    photo:{type:"binary"},
    category:{type:"string",
    required: true
    },
    StockLog:{
      collection:"StockLog",
      via:"stock"
    }
  }
};

