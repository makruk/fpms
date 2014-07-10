module.exports = function(req, res, next) {
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }


  var part=req.ip.split(".");
  if(part[0] === "160" && part[1] === "252"){
    return next();
  }
  return res.forbidden(req.ip+'You can access only from secure-net.'+ipAddr);
};