module.exports = function (app,bb) {
    // console.log('bbb',{bb});
  
    return  (req, res, next) =>  {
      // console.log(`${req.method} ${req.url}`);
     return next();
    };
  };
  