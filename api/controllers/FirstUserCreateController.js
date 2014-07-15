/**
 * FirstUserCreateController
 *
 * @description :: Server-side logic for managing Firstusercreates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index:function(req, res){
    User.find({}).exec(function(err, f){
      if(err)return res.serverError("DB error.");
      if(f.length>0)return res.forbidden();
      var pass=Math.round( Math.random() * 1e15 ).toString(36);
      User.create({limit:0, balance:0, permission:1, name:"admin", user_id:"admin", password:pass}).exec(function(err, c){
        c.password=pass;
        res.json(c);
      });
    });
  }
};

