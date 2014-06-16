/**
 * RequestController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
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
		Request.find({or:checkview}).exec(function findCB(err,found){
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
