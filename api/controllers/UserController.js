/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
    return res.view();
  },
  user:function(req, res){
    return res.view();
  },
  create:function(req, res){
    if(req.method == 'GET')return res.view();
  	var name=req.param('name');
	var user_id=req.param('user_id');
	var password=req.param('password');
	var grade=req.param('grade');
	var permission=req.param('permission');
	var limit=req.param('limit');
	User.create({name:name, user_id:user_id, password:password, grade:grade, permission:permission, limit:limit}).exec(function(err){console.log(err)});
  	return res.redirect("/user");
  }
};
