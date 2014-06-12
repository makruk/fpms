/**
 * StockController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
		Stock.find({}).exec(function(err,found){
			this.stock = found;
		});
    return res.view();
  },
  stock:function(req, res){
	  return res.view();
  },
	submit:function(req,res){
		var stock = req.param('stock');
		Stock.create({stock:stock,review:0,evaluation:0})
		.exec(function(err){});
		return res.redirect("/stock")
	}
};