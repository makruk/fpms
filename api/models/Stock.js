/**
* Stock.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{type:"string"},
    price:{type:"integer"},
    number:{type:"integer"},
    photo:{type:"binary"},
    category:{type:"string"}
  }
};

