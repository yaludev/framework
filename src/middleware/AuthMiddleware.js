const jwt = require('jsonwebtoken');
module.exports = function (app) {

const config = app.make('config');

   return (req, res, next) = () =>{
    console.log('AuthMiddleware running');
    const authHeader = req.get('authorization');

    if (!authHeader || authHeader.split(' ').length !== 2) {
      return res
        .status(403)
        .json({ success: false, code: 403, msg: 'Please provide a token' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const key = config.get('key');
      const decoded = jwt.verify(token, key);

      req.user = decoded;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, code: 401, msg: 'Invalid token' });
    }
  
}
};