module.exports = function(req, res, next) {
  var part=req.ip.split(".");
  if(part[0] === "160" && part[1] === "252"){
    return next();
  }
  var s="";
  for(var i=0;i<req.ips.length;i++){
    s+="["+req.ips[i]+"]";
  }
  return res.forbidden(req.ip+'You can access only from secure-net.'+s);
};