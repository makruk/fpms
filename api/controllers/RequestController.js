/**
 * RequestController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
		Request.find({}).exec(function(err,found){
			this.requests = found;
		});
    return res.view();
  },
  request:function(req, res){
		Request.find({}).exec(function(err,found){
			this.requests = found;
		});
	  return res.view();
  },
	submit:function(req,res){
    if(req.method == 'GET')return res.view();
		var request = req.param('request');
		Request.create({request:request,review:0})
		.exec(function(err){});
		return res.redirect("/request/request");
	}
};
