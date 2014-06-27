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
    var id=req.param('id')
    User.findOne({user_id:id}).exec(function findOneCB(err, found){
      this.user=found;
    });
    return res.view();
  },
  create:function(req, res){
  	var name=req.param('name');
		var user_id=req.param('user_id');
		var password=req.param('password');
    var password_confirm=req.param('password_confirm');
		var grade=req.param('grade');
		var permission=req.param('permission');
		var limit=req.param('limit');
    var balance=0;
    if(password!==password_confirm){
      return res.view();
    }
		User.create({name:name, user_id:user_id, password:password, grade:grade, permission:permission, balance:balance, limit:limit}).exec(function(err){
      if(err){
        console.log(err);
        return res.view();
      }
      else{
        return res.redirect('/user');
      }
    });
  },
  edit:function(req, res){
    var id=req.param('id');
    User.findOne({user_id:id}).exec(function findOneCB(err, found){
      this.user=found;
    });
    if(req.method==="GET"){
      return res.view();
    }
    else{
      var name=req.param('name');
      var user_id=req.param('user_id');
      var grade=req.param('grade');
      var limit=req.param('limit');
      var balance=this.user.balance;
      var money=parseInt(req.param('money')) || 0;
      var inOut=req.param('inOut');
      if(money<0){
        return res.view();
      }
      if(inOut == 1 || inOut == 0)User.payment(user_id, money, inOut, "残高調整", console.log);
      User.update({user_id:id},{name:name, user_id:user_id, grade:grade, limit:limit}).exec(function(err, updated){
        if(err){
          console.log(err);
          return res.view();
        }
        else{
          return res.redirect('/user/'+user_id);
        }
      });
    }
  }
};
