module.exports = function(req, res, next) {
  var part=req.ip.split(".");
  if(req.ip==="127.0.0.1")return next();
  if(part[0] === "160" && part[1] === "252"){
    return next();
  }
  return res.forbidden(part[0]+"."+part[1]+"."+part[2]+"."+part[3]+'You can access only from secure-net.');
};