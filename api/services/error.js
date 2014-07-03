module.exports={
  response:function(err){
    var res={};
    console.log(err.errors);
    console.log(err.messages);
    console.log(err.rules);
    for(var i in err.rules){
      res[i]="";
      for(var j=0;j<err.rules[i].length;j++){
        res[i]+=this.message(err.rules[i][j]);
      }
    }
    return res;
  },
  message:function(rule){
    switch(rule){
      case "integer":return "整数を入力してください　";
      case "number":return "数字を入力してください　";
      case "unique":return "重複しています　";
      case "min":return "値が大きすぎます　";
      case "min":return "値が小さすぎます　";
      case "maxLength":return "長すぎます　";
      case "minLength":return "短すぎます　";
      default:return "入力エラーです";
    }
  }
}