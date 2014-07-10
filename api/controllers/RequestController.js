/**
 * RequestController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){

		/*フィードバックの有無のチェック*/
		this.r1=req.param('r1');
		var checkfeed = {contains:""};
		if(req.param('r1') == '0'){
			checkfeed = "";
		}
		if(req.param('r1') == '1'){
			checkfeed = {'!':['']};
		}

		/*評価の状態に関して*/
		var checkview = req.param('grade') || '';
		var gradecheck = checkview.toString();
		this.gradecheck = gradecheck;
		if(checkview instanceof Array){
			for(var i=0;i<checkview.length;i++){
				checkview[i]={review:checkview[i]};
			}
		}
		else{
			if( checkview!== ""){
				checkview=[{review:checkview}];
			}
			else{
				checkview=[{}];
			}
		}
		
		Request.find({where:{or:checkview,responce:checkfeed},sort:'id DESC'}).populate('favUser').populate('User').exec(function findCB(err,found){
			this.requests = found;
			for(var i = 0; i < this.requests.length;i++){
				this.requests[i].user_name = this.requests[i].User.name;
			}
			return res.view();
		});
	},

	/*管理者側、リクエスト詳細ページ*/
	request:function(req,res){
		var id = req.param('id');
		Request.findOne({id:id}).populate('User').populate('favUser').exec(function (err,found){
			this.request = found;
			this.user=found.User;
			return res.view();
		});
	},
	/*フィードバック送信 修正*/
	feedsubmit:function(req,res){
		var id = req.param('id');
		var newfeedback = req.param('feedback');
		var newreview = req.param('r1');
		Request.update({id:id},{responce:newfeedback, review:newreview}).exec(function(err,updated){
			if(err){
				console.log(err);
				return res.redirect('/request/'+id);
			}
			else{
				return res.redirect('/request');
			}
		});
	},

	/*リクエスト削除*/
	destroy:function(req,res){
		var id = req.param('id');
		Request.destroy({id:id}).exec(function deleteCB(err){
			console.log('The record has been deleted');
			return res.redirect('/request');
		});
	},

	/*以下購入者側*/
  user_request:function(req,res){
		var user_id = req.session.user_id;
		var id;
		User.findOne({user_id:user_id}).exec(function(err,found){
			id = found.id;
			/*フィードバックのチェック*/
			var checkfeed = {contains:""};
			if(req.param('r2') == '1'){
				checkfeed = {'!':['']};
			}

			/*自分の投稿のチェックをif文で検索*/
			/*r1checker及びr2checkerはリクエスト検索後のチェックを保持するため*/
			var query={responce:checkfeed};
			if(req.param('r1') == '1'){
				query.User=id;
			}
			Request.find({where:query,sort:'id DESC'}).populate('favUser').populate('User').exec(function (err,rf){
				this.requests = rf;
				if(req.param('r1') == '1'){
					this.requests.r1checker = 1;
				}
				else{
					this.requests.r1checker = 0;
				}
				if(req.param('r2') == '1'){
					this.requests.r2checker = 1;
				}else{
					this.requests.r2checker = 0;
				}
				for(var i = 0; i < this.requests.length;i++){
					if(!err)this.requests[i].user_id = this.requests[i].User.user_id;
					if(i===this.requests.length-1)return res.view();
				}
			});
		});
  },
	reqsubmit:function(req,res){
    if(req.method == 'GET')return res.view();
		var request = req.param('request');
		if(request == ""){
			return res.redirect("/request/user_request");
		}
		var user_id = req.session.user_id;

		var id;
		User.findOne({user_id:user_id}).exec(function(err,found){
			id = found.id;
			Request.create({request:request,review:0,User:id})
			.exec(function(err){
				return res.redirect("/request/user_request");
			});
		});
	},

	/*いいね管理(追加のほう)、いいね数表示はリクエスト表示の部分にあります*/
	evaluation:function(req,res){
		var request_id = req.param('id');
		var user_id = req.session.user_id;
		var neweva;
		var id

		User.findOne({user_id:user_id}).exec(function(err,found){
			id = found.id;
			Request.findOne({id:request_id}).exec(function(err,found){
				found.favUser.add(id);
				found.save(function(err){
					return res.redirect("/request/user_request");
				});
			});
		});
	}
};

