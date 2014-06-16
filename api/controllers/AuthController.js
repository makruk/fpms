/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  login:function(req, res){
    var bcrypt=require('bcrypt');
    var user_id=req.param("id");
    var password=req.param("password");
    if(user_id !== void 0){
      User.findOne({user_id:user_id}).exec(function(err, found){
        if(err)res.json({error:"DB error"}, 500);
        if( found !== void 0 ){
          bcrypt.compare(password, found.password, function(err, correct){
            req.session.user_id=user_id;
            req.session.permission=found.permission;

            /*リダイレクト先は後で変更*/
            return res.redirect("/");
          });
        }
        else{
          return res.json({id:user_id});
        }
      });
    }
    else{
      return res.view();
    }
  },
  logout:function(req, res){
    req.session.user_id=void 0;
    req.session.permission=void 0;
    res.redirect("/auth/login");
  }
};
