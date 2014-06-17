/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
    var name=req.param('name') || '';
    var grade=req.param('grade') || '';
    var from_balance=req.param('from_balance') || -10e9;
    var to_balance=req.param('to_balance') || 10e9;
    var sort=req.param('sort') || "id";
    var order=(req.param('r1')=='1' ?" ASC":" DESC");
    if(grade instanceof Array){
      for(var i=0;i<grade.length;i++){
        grade[i]={grade:grade[i]};
      }
    }
    else{
      if( grade!== ""){
        grade=[{grade:grade}];
      }
      else{
        grade=[{}];
      }
    }
    User.find({where:{name:{'contains':name}, or:grade, balance: {'>=': from_balance, '<=': to_balance}}, sort: sort+order}).exec(function findCB(err,found){
      this.found=found;
    });
    
    return res.view();
  },
  user:function(req, res){
    return res.view();
  },
  create:function(req, res){
  	var name=req.param('name');
		var user_id=req.param('user_id');
		var password=req.param('password');
		var grade=req.param('grade');
		var permission=req.param('permission');
		var limit=req.param('limit');
    var balance=0;
		User.create({name:name, user_id:user_id, password:password, grade:grade, permission:permission, balance:balance, limit:limit}).exec(function(err){});
  	return res.redirect("/user");
  }
};
