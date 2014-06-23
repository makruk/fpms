/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
    this.name=req.param('name') || '';
    var grade=req.param('grade') || '';
    this.from_balance=req.param('from_balance') || '';
    this.to_balance=req.param('to_balance') || '';
    this.sort=req.param('sort') || "id";
    this.order=(req.param('r1')=='1' ?" ASC":" DESC");
    this.grade=grade.toString();
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
    User.find({where:{name:{'contains':this.name}, or:grade, balance: {'>=': this.from_balance || -10e9, '<=': this.to_balance || 10e9}}, sort: this.sort+this.order}).exec(function findCB(err,found){
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
      var ban=req.param('ban');
      if(ban==1){
        if(this.user.permission == 1){
          this.user.permission=11;
        }
        else{
          this.user.permission=10;
        }
      }
      else{
        if(this.user.permission == 10){
          this.user.permission=0;
        }
        if(this.user.permission == 11){
          this.user.permission=1;
        }
      }
      if(inOut==1){
        balance+=money;
      }
      else{
        balance-=money;
      }
      User.update({user_id:id},{name:name, user_id:user_id, grade:grade, limit:limit, balance:balance, permission:this.user.permission}).exec(function(err, updated){
        if(err){
          console.log(err);
          return res.view();
        }
        else{
          return res.redirect('/user/'+user_id);
        }
      });
    }
  },
  mypage:function(req, res){
    var id=req.session.user_id;
    User.findOne({user_id:id}).exec(function findOneCB(err, found){
      this.user=found;
    });
    return res.view();
  },
  myedit:function(req, res){
    var id=req.session.user_id;
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

      User.update({user_id:id},{name:name, user_id:user_id, grade:grade}).exec(function(err, updated){
        if(err){
          console.log(err);
          return res.view();
        }
        else{
          return res.redirect('/user/mypage');
        }
      });
    }

  },
  password:function(req, res){
    if(req.method==="GET"){
      return res.view();
    }
    if(req.session.permission==0){
      if(req.session.user_id !== req.param('id')){
        return res.redirect('/user/mypage');
      }
    }
    var id=req.param('id');
    var password=req.param('password');
    var password_confirm=req.param('password_confirm');
    if(password!==password_confirm){
      return res.view();
    }
    User.update({user_id:id},{password:password}).exec(function(err, updated){
      if(err){
        console.log(err);
        return res.view();
      }
      else{
        return res.redirect('/user/mypage');
      }
    });
    return res.view();
  }
};
