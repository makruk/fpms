/**
 * RequestController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){

		/*フィードバックの有無のチェック*/
		var checkfeed = {contains:""};
		if(req.param('r1') == '0'){
			checkfeed = "";
		}
		if(req.param('r1') == '1'){
			checkfeed = {'!':['']};

		}

		/*評価の状態に関して*/
		var checkview = req.param('grade') || '';
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

		Request.find({or:checkview,responce:checkfeed}).exec(function findCB(err,found){
			this.requests = found;
		});
    return res.view();
  },

  request:function(req, res){
		Request.find({}).exec(function (err,found){
			this.requests = found;
		});
	  return res.view();
  },

	submit:function(req,res){
		var request = req.param('request');
		Request.create({request:request,review:0})
		.exec(function(err){});
		return res.redirect("/request/request");
	}
};

