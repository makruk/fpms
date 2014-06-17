/**
* Request.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    request:{type:"string"},
    responce:{type:"string", defaultsTo:""},
    review:{type:"integer"},
		evaluation:{type:"integer"},
    User:{
      model:"User"
    },
    favUser:{
      collection:"User",
      via:"favRequest",
      dominant:true
    }
  }
};

