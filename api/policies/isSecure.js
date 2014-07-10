module.exports = function(req, res, next) {
  if(req.ip==="127.0.0.1")return next();
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  var part=ipAddr.split(".");
  if(part[0] === "160" && part[1] === "252"){
    return next();
  }
  return res.forbidden('You can access only from secure-net. Your access is from:'+ipAddr);
};