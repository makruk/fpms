module.exports = function(req, res, next) {
  var part=req.ip.split(".");
  if(req.ip==="127.0.0.1")return next();
  if(part[0] === "160" && part[1] === "252"){
    return next();
  }
  return res.forbidden('You can access only from secure-net.');
};