/**
 * StockController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  index:function(req, res){
    Category.find({}).exec(function(err, found){
      if(!err)this.category=found;
    });
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
    Category.find({}).exec(function(err, found){
      if(!err)this.category=found;
    });
    if(req.method == 'GET')return res.view();
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
    Category.find({}).exec(function(err, found){
      if(!err)this.category=found;
    });
    if(req.method == 'GET')return res.view();
  	var name=req.param('name');
	var price=req.param('price');
	var number=req.param('number');
	var photo=req.param('photo');
	var category=req.param('category');

	var id=req.param('id');
	Stock.update({id:id}, {name:name, price:price, number:number, photo:photo, category:category}).exec(function(err){});
  	return res.redirect("/stock/"+id);
  },
  purchase:function(req, res){
    var user_id=req.session.user_id;
    var id;
    var stocks=req.allParams();
    try{
      User.findOne({user_id:user_id}).exec(function(err, u){
        if(err)throw err;
        for(var i in stocks){
          var stock=parseInt(i.slice(2));
          var number=parseInt(stocks[i]);
          if(stock === NaN || number === NaN) continue;
          Stock.findOne({id:stock}).exec(function(err, s){
            if(err)throw err;
            s.number-=number;
            Stock.update({id:s.id}, {number:s.number}, function(err){
              if(err)throw err;
              User.payment(u.id, s.price*number, 2, s.name+"を購入", function(err){
                if(err)throw err;
                StockLog.addLog(s.id, number, s.price, 2, u.name+"が購入");
              });
            });
          });
        }
        return res.redirect("/stock/");
      });
    }
    catch(err){
      return res.serverError(err);
    }
  }
};