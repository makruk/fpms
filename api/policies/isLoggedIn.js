module.exports = function(req, res, next) {
  if (req.session.user_id !== void 0) {
    return next();
  }
  return res.redirect('/auth/login');
};