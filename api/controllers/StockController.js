/**
 * StockController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index:function(req, res){
    this.order=(req.param('order')=='ASC' ?" ASC":" DESC");
    this.sort=req.param('sort') || "id";
    Stock.find({sort: this.sort+this.order}).exec(function(err,found){
      this.stocks = found;
    });
    for(var i=0;i<stocks.length;i++){
      this.stocks[i].proceeds=0;
      StockLog.findOneWeek({stock:stocks[i].id, kind:"購入"}, function(err, f){
        for(var j=0;j<f.length;j++){
          this.stocks[i].proceeds+=f[j].number;
        }
      });
    }
    Category.find({}).exec(function(err, found){
      if(!err)this.category=found;
    });
    return res.view();
  },
  stock:function(req, res){
    var id=req.param('id');
    Stock.findOne({id:id}).exec(function(err, found){
      if(found===void 0)return res.notFound();
      if(err)return res.serverError();
      this.stock=found;
      StockLog.findTop({or:[{kind:"追加"},{kind:"編集"}], stock:id}, function(err, f){
        if(err){
          this.stock.buy_price=0;
        }
        else{
          this.stock.buy_price=f.price;
        }
      });
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
    Stock.create({name:name, price:price, number:0, category:category}).exec(function(err, r){
       if(err){
         console.log(err);
       }
       else{
         StockLog.addLog(r.id, 0, r.price, 0, r.name+"を追加");
       }
    });
    return res.redirect("/stock/");
  },
  edit:function(req, res){
    Category.find({}).exec(function(err, found){
      if(!err)this.category=found;
    });
    var id=req.param('id');
    Stock.findOne({id:id}).exec(function(err, found){
      if(found===void 0)return res.notFound();
      if(err)return res.serverError();
      this.stock=found;
      StockLog.findTop({or:[{kind:"追加"},{kind:"編集"}], stock:id}, function(err, f){
        if(err){
          this.stock.buy_price=0;
        }
        else{
          this.stock.buy_price=f.price;
        }
      });
      if(req.method=="GET")return res.view();

      var name=req.param('name');
      var price=req.param('price');
      var category=req.param('category');
      var buy_price=req.param('buy_price');
      Stock.update({id:id}, {name:name, price:price,  category:category}).exec(function(err, r){
        if(err){
          console.log(err);
        }
        else{
          StockLog.addLog(r[0].id, 0, buy_price, 5, r[0].name+"を編集");
        }
      });
      return res.redirect("/stock/"+id+"/");
    });
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
        Stock.update({id:s}, {number:n}).exec(function(err, r){
          if(err){
          }
          else{
            StockLog.addLog(r[0].id, n, r[0].price, (n<r[0].number?3:4), reason);
          }
        });
      }
    };
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
    for(var i=0; id.length>i; i++){
      var s=parseInt(id[i]);
      var n=parseInt(number[i]);
      if(n != NaN){
        Stock.update({id:s}, {number:n+stocks[s-1].number}).exec(function(err, r){
          if(err){
          }
          else{
            StockLog.addLog(r[0].id, n, r[0].price, 1, r[0].name+"を入荷");
          }
        });
      }
    }
    return res.redirect("/stock/");
  },
  list:function(req, res){
    this.params=req.allParams();
    Category.find({}).exec(function(err, found){
      if(!err)this.category=found;
    });
    Stock.find({}).exec(function(err,found){
      this.stocks = found;
    });
    return res.view();
  },
  purchase:function(req, res){
    var user_id=req.session.user_id;
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
    if(Object.keys(stocks).length === 0)res.redirect("/stock/list");
    if(req.method === "GET"){
      this.stocks=[];
      var cash=0;
      for(var i in stocks){
        Stock.findOne({id:parseInt(i.slice(2))}).exec(function(err, s){
          if(err)return;
          s.param=parseInt(stocks[i]);
          this.stocks.push(s);
          cash+=s.price*s.param;
          if(s.number < s.param){
            this.error["id"+s.id]="在庫が足りません";
          }
        });
      }
      if(cash > req.session.balance + req.session.limit)this.error.messages="預金が足りません";
      return res.view();
    }
    try{
      User.findOne({user_id:user_id}).exec(function(err, u){
        if(err)throw err;
        for(var i in stocks){
          var stock=parseInt(i.slice(2));
          var number=parseInt(stocks[i]);
          if(stock === NaN || number === NaN) continue;
          Stock.findOne({id:stock}).exec(function(err, s){
            if(err)throw err;
            if(s.number-number<0){
              throw {messages:s.name+"の在庫が足りません"};
            }

            Stock.update({id:s.id}, {number:s.number-number}, function(err){
              if(err)throw err;
              User.payment(u.id, s.price*number, 2, s.name+"を購入", function(err){
                if(err){
                  Stock.update({id:s.id}, {number:number}, function(err){
                    if(err)StockLog.addLog(s.id, number, s.price, 0, "Rollback failed.");
                  });
                  throw err;
                }
                StockLog.addLog(s.id, number, s.price, 2, u.name+"が購入");
              });
            });
          });
        }
        return res.redirect("/stock/list");
      });
    }
    catch(err){
      this.error=err;
      return res.view();
    }
  }
};
