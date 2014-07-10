/**
 * LogController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index:function(req, res){
    StockLog.find({where:{}, sort:"id DESC"}).exec(function(err, sl){
      if(!err){
        this.stockLog=sl;
      }
      else this.stockLog=["Loading error!"];
      UserLog.find({where:{}, sort:"id DESC"}).exec(function(err, ul){
        if(!err){
          for(var i=0;i<ul.length;i++){
            User.findOne({id:ul[i].user}).exec(function(err, u){
              ul[i].user_id=u.user_id;
            });
          }
          this.userLog=ul;
        }
        else this.userLog=["Loading error!"];
        return res.view();
      });
    });
  }
};
