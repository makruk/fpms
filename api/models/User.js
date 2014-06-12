/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{type:"string"},
    user_id:{type:"string"},
    password:{type:"string"},
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
      dominant:true,
      collection:"Request",
      via:"favUser"
    }
  }
};

