/**
 * StockController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index:function(req, res){
    this.params=req.allParams();
    this.order=(req.param('order')=='ASC' ?" ASC":" DESC");
    this.sort=req.param('sort') || "id";
    Stock.find({sort: this.sort+this.order}).exec(function(err,found){
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
    this.order=(req.param('order')=='ASC' ?" ASC":" DESC");
    this.sort=req.param('sort') || "id";
    Stock.find({sort: this.sort+this.order}).exec(function(err,found){
      this.stocks = found;
    });
    return res.view();
  },
   reason:function(req, res){
    Stock.find({}).exec(function(err,found){
      this.stocks = found;
    });
    var changenumber=req.param('changenumber');
    var number=req.param('number');
    var reason=req.param('reason');
    var id=req.param('id');
    this.id = id;
    this.changenumber = changenumber;
    this.number = number;
    if(req.method==="GET")return res.view();
    for(var i=0; id.length>i; i++){
      var s=parseInt(id[i]);
      var n=parseInt(changenumber[i]);
      if(n != NaN){
      Stock.update({id:s}, {number:n}).exec(function(err){
        console.log(err);
      });
    }
    };
    return res.redirect("/stock/");
  },
   add:function(req, res){
    var id;
    var stocks=req.allParams();
    this.query="?";
    for(var i in stocks){
      if(stocks[i] === '0' || stocks[i] === ''){
        delete stocks[i];
        continue;
      }
      this.query+=i+'='+stocks[i]+'&';
    }
    this.error={};
    if(Object.keys(stocks).length === 0)res.redirect("/stock/");
    if(req.method === "GET"){
      this.stocks=[];
      var cash=0;
      for(var i in stocks){
        Stock.findOne({id:parseInt(i.slice(2))}).exec(function(err, s){
          if(err)return;
          s.param=parseInt(stocks[i]);
          this.stocks.push(s);
          cash+=s.price*s.param;
        });
      }
      return res.view();
    }
    try{
        if(err)throw err;
        for(var i in stocks){
          var stock=parseInt(i.slice(2));
          var number=parseInt(stocks[i]);
          if(stock === NaN || number === NaN) continue;
                console.log(number);
          Stock.findOne({id:stock}).exec(function(err, s){
                  console.log(err);
            Stock.update({id:s.id}, {number:s.number+number}, function(err){
              });
            });
          }
        return res.redirect("/stock/");
    }
    catch(err){
      this.error=err;
      return res.view();
    }
  }
  }