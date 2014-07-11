/**
 * LogController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index:function(req, res){
    StockLog.find({where:{}, sort:"id DESC"}).populate('stock').exec(function(err, sl){
      if(!err){
        this.stockLog=sl;
      }
      else this.stockLog=["Loading error!"];
      UserLog.find({where:{}, sort:"id DESC"}).populate('user').exec(function(err, ul){
        if(!err){
          for(var i=0;i<ul.length;i++){
            ul[i].user_id=ul[i].user.user_id;
          }
          this.userLog=ul;
        }
        else this.userLog=["Loading error!"];
        return res.view();
      });
    });
  }
};
