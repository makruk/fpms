/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 * 
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.) 
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg` 
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or 
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  // 
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  '/': 'AuthController.index',


  // Custom routes here...

  '/user/create':'UserController.create',
  '/stock/create':'StockController.create',


  '/user/mypage':'UserController.mypage',
  '/user/mypage/edit':'UserController.myedit',
  '/user/alledit':'UserController.alledit',
  '/user/:id':'UserController.user',
  '/user/:id/edit':'UserController.edit',
  '/user/:id/password':'UserController.password',

  '/stock/:id':'StockController.stock',
  '/stock/:id/edit':'StockController.edit',


<<<<<<< HEAD
=======
  'post /stock/create':'StockController.create',
  'get /stock/:id':'StockController.stock',
  'get /stock/:id/edit':'StockController.edit',

>>>>>>> フィードバックかんせい
  '/request/user_request':'RequestController.user_request',
	'/request/reqsubmit':'RequestController.reqsubmit',
	'/request/:id/feedsubmit':'RequestController.feedsubmit',
  '/request/:id':'RequestController.request',

  // If a request to a URL doesn't match any of the custom routes above, it is matched 
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

};
