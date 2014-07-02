/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  index:function(req, res){
    if(req.session.permission === 1){
      return res.redirect('/request');
    }
    else if(req.session.permission === 0){
      return res.redirect('/stock/list');
    }
    else{
      return res.redirect('/auth/logout');
    }
  },
  login:function(req, res){
    this.err={};
    if(req.session.user_id != void 0)return res.redirect('/');
    if(req.method == 'GET')return res.view();
    var bcrypt=require('bcrypt');
    var user_id=req.param("id");
    var password=req.param("password");
    if(user_id !== void 0){
      User.findOne({user_id:user_id}).exec(function(err, found){
        if(err)return res.view();
        if( found !== void 0 ){
          bcrypt.compare(password, found.password, function(err, correct){
            if(correct && found.permission<=9){
              req.session.user_id=user_id;
              req.session.permission=found.permission;
              req.session.balance=found.balance;
                return res.redirect("/auth/");
            }
            else{
              this.err.id="ユーザーIDまたはパスワードが不正です";
              return res.view();
            }
          });
        }
        else{
          this.err.id="ユーザーIDまたはパスワードが不正です";
          return res.view();
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
