module.exports = function(req, res, next) {
  req.session.error={};
  req.session.error.element={};
  if (req.session.user_id !== void 0) {
    if(req.session.permission === 0){
      User.findOne({user_id:req.session.user_id}).exec(function(err, f){
        if(!err){
          req.session.limit=f.limit;
          req.session.balance=f.balance;
        }
      });
    }
    return next();
  }
  return res.redirect('/auth/login');
};