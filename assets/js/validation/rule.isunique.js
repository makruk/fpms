window.isUnique=function(field, rules, i, options){
  var responseText="";
  var ignore=rules[i+2];
  if(ignore !== field.val()){
    $.ajax({
      type:"GET",
      url:"/user/isUnique/"+field.val(),
      async:false,
      dataType:'json',
      success:function(data){
        if(data.unique === false){
          responseText="ユーザーIDが重複しています";
        }
      },
      error:function(){
        responseText="サーバーエラー";
      }
    });
    if(responseText !== ""){
      return responseText;
    }
  }
}