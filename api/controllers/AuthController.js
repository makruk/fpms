/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  login:function(req, res){
    var user_id=req.param("id");
    var password=req.param("password");
    if(user_id !== void 0){
      User.find({user_id:user_id}).exec(function(err, found){
        if( found[0] !== void 0 && found[0].password === password ){
          req.session.user_id=user_id;
          req.session.permission=found[0].permission;

          /*リダイレクト先は後で変更*/
          res.redirect("/request/");
        }
        else{
          res.view();
        }
      });
    }
    else{
      res.view();
    }
  },
  logout:function(req, res){
    req.session.user_id=void 0;
    req.session.permission=void 0;
    res.redirect("/auth/login");
  }
};
