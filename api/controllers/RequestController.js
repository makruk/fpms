/**
 * RequestController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
		Request.find({}).exec(function(err,found){
			this.request = found;
		});
    return res.view();
  },
  request:function(req, res){
	  return res.view();
  }
	submit:function(req,res){
		var request = req.param('request');
		Request.create({request:request,review:0,evaluation:0})
		.exec(function(err){});
		return res.redirect("/request")
	}
};
