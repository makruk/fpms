/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var errorHandler=require('../services/errorHandler.js');
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
    User.find({where:{name:{'contains':this.name}, or:grade, balance: {'>=': this.from_balance || -10e15, '<=': this.to_balance || 10e15}}, sort: this.sort+this.order}).exec(function findCB(err,found){
      this.found=found;
      return res.view();
    });
    
  },
  user:function(req, res){
    var id=req.param('id');
    User.findOne({user_id:id}).exec(function findOneCB(err, found){
      this.user=found;
      this.log=[];
      UserLog.find({user:this.user.id}).sort("id ASC").exec(function(err, f){
        if(err)return;
        var balance=0;
        for(var i=0;i<f.length;i++){
          if(f[i].kind == "入金")balance+=f[i].cash;
          else if(f[i].kind == "出金" || f[i].kind == "購入")balance-=f[i].cash;
          var date=new Date(f[i].createdAt);
          var strdate=date.getFullYear()+"-"+(1+date.getMonth())+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
          this.log.push({balance:balance, date:strdate, note:f[i].note});
        }
        return res.view();
      });
    });
  },
  create:function(req, res){
    if(req.method == 'GET')return res.view();
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
        req.session.error=errorHandler.responce(err);
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
        var note=req.param('note');
        if(money<0){
          req.session.error={money:"入出金額は1以上の整数を入力してください"};
          return res.view();
        }
        var ban=req.param('ban');
        if(ban==1 && req.session.user_id!=this.user.user_id){
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
        User.update({user_id:id},{name:name, user_id:user_id, grade:grade, limit:limit,  permission:this.user.permission}).exec(function(err, updated){
          if(err){
            req.session.error=errorHandler.response(err);
            return res.view();
          }
          else{
            if(inOut == 1 || inOut == 0){
              User.payment(user_id, money, inOut, note || "残高調整", function(err){
                if(err){
                  err["money"]="預金が少なすぎます！";
                  req.session.error=errorHandler.response(err);
                  return res.view();
                }
                else{
                  return res.redirect('/user/'+user_id);
                }
              });
            }
          }
        });
      }
    });
  },
  mypage:function(req, res){
    var id=req.session.user_id;
    User.findOne({user_id:id}).exec(function findOneCB(err, found){
      this.user=found;
      this.log=[];
      UserLog.find({user:this.user.id}).sort("id ASC").exec(function(err, f){
        if(err)return;
        var balance=0;
        for(var i=0;i<f.length;i++){
          if(f[i].kind == "入金")balance+=f[i].cash;
          else if(f[i].kind == "出金" || f[i].kind == "購入")balance-=f[i].cash;
          var date=new Date(f[i].createdAt);
          var strdate=date.getFullYear()+"-"+(1+date.getMonth())+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
          this.log.push({balance:balance, date:strdate, note:f[i].note});
        }
        return res.view();
      });
    });
  },
  myedit:function(req, res){
    var id=req.session.user_id;
    User.findOne({user_id:id}).exec(function findOneCB(err, found){
      this.user=found;
      if(req.method==="GET"){
        return res.view();
      }
      else{
        var name=req.param('name');
        var user_id=req.param('user_id');
        var grade=req.param('grade');

        User.update({user_id:id},{name:name, user_id:user_id, grade:grade}).exec(function(err, updated){
          if(err){
            req.session.error=errorHandler.response(err);
            return res.view();
          }
          else{
            return res.redirect('/user/mypage');
          }
        });
      }
    });
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
        req.session.error=errorHandler.response(err);
        return res.view();
      }
      else{
        if(req.session.permission==1){
          return res.redirect('/user/'+id+'/edit');
        }
        else{
          return res.redirect('/user/mypage/edit');
        }
      }
    });
  },
  alledit:function(req, res){
    if(req.session.permission!=1){
      return res.redirect('/user');
    } else if(req.method==="GET"){
      return res.view();
    }

    var allUp=req.param('allUp');
    var grade=req.param('grade') || '';
    var permission=0;
    if(allUp==1){
      User.find({}).exec(function findCB(err,found){
        this.found=found;
        for(i=0; this.found.length>i ;i++){
          grade=this.found[i].grade;
          switch (grade){
            case 1: grade=2; break;
            case 2: grade=3; break;
            case 3: grade=4; break;
          }
          User.update({user_id:this.found[i].user_id},{grade:grade}).exec(function(err, updated){
            if(err){
              req.session.error=errorHandler.response(err);
              return res.view();
            }
          });
        }
        return res.redirect('/user');
      });
    } else {
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
          grade=[{grade:-1}];
        }
      }
    }

    User.find({where:{or:grade}}).exec(function findCB(err,found){
      this.found=found;
      for(var i=0; this.found.length>i; i++){
        if(req.session.user_id!=this.found[i].user_id){
          if(this.found[i].permission==1 || this.found[i]==11){
            permission=11;
          }
          else {
            permission=10;
          }
          User.update({user_id:this.found[i].user_id},{permission:permission}).exec(function(err, updated){
            if(err){
              req.session.error=errorHandler.response(err);
              return res.view();
            }
            return res.redirect('/user');
          });
        }
      }
    });
  }
};
