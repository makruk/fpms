module.exports = function(req, res, next) {
<<<<<<< HEAD
  if (req.session.permission === 1) {
    return next();
  }

  return res.forbidden('You are not permitted to perform this action.');
};
