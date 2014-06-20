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
  create:function(req, res){
  	var name=req.param('name');
	var price=req.param('price');
	var number=req.param('number');
	var photo=req.param('photo');
	var category=req.param('category');
	User.create({name:name, price:price, number:number, photo:photo, category:category}).exec(function(err){});
  	return res.redirect("/stock/");
  },
   edit:function(req, res){
  	var name=req.param('name');
	var price=req.param('price');
	var number=req.param('number');
	var photo=req.param('photo');
	var category=req.param('category');
	var id=req.param('id');
	User.update({id:id}, {name:name, price:price, number:number, photo:photo, category:category}).exec(function(err){});
  	return res.redirect("/stock/"+id);
  }
};