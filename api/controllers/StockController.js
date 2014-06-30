/**
 * StockController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index:function(req, res){
    Stock.find({}).exec(function(err,found){
      this.stocks = found;
    });
    return res.view();
  },
  stock:function(req, res){
    Stock.findOne({id:req.param('id')}).exec(function(err, found){
      if(found===void 0)return res.notFound();
      if(err)return res.serverError();
      this.stock=found;
      return res.view();
    });
  },
  create:function(req, res){
  	var name=req.param('name');
	var price=req.param('price');
	var buy_price=req.param('buy_price');
	var photo=req.param('photo');
	var category=req.param('category');
	Stock.create({name:name, price:price, number:0, category:category}).exec(function(err){
          if(err)console.log(err);
        });
  	return res.redirect("/stock/");
  },
   edit:function(req, res){
   	if(req.method=="GET") return res.view();
  	var name=req.param('name');
	var price=req.param('price');
	var number=req.param('number');
	var photo=req.param('photo');
	var category=req.param('category');

	var id=req.param('id');
	Stock.update({id:id}, {name:name, price:price, number:number, photo:photo, category:category}).exec(function(err){});
  	return res.redirect("/stock/"+id+"/");
  },
   loss:function(req, res){
    Stock.find({}).exec(function(err,found){
      this.stocks = found;
    });
    return res.view();
  },
   reason:function(req, res){
    Stock.find({}).exec(function(err,found){
      this.stocks = found;
    });
    var changenumber=req.param('changenumber');
    this.changenumber = changenumber;
    if(req.method==="GET")return res.view();
    return res.redirect("/stock/");
  },
   add:function(req, res){
    Stock.find({}).exec(function(err,found){
      this.stocks = found;
    });
    var number=req.param('number');
    var id=req.param('id');
    this.number = number;
    this.id = id;
    if(req.method==="GET")return res.view();
    return res.redirect("/stock/");
  }
};
