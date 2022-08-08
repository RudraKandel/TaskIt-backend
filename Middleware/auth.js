const jwt = require('jsonwebtoken');

module.exports.authentication = (req,res,next) => {
    const tokenHeader = req.headers.authorization;
    if(tokenHeader) {
        const token = tokenHeader.split(' ')[1];
        if(!token)
        return res.status(401).json({status:false , msg:"No Token "});

        try {
            req.user = jwt.verify(token,process.env.JWT_KEY);
            next();
        } catch (error) {
            return res.status(400).json({status:false ,msg:"Invalid token"});
        }
    }else{
        return res.status(400).json({status:false,msg:"please send the bearer token"});
    }
}
module.exports.authorization = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(401).json({ status: false, msg: 'You are not authorized' });
    else next();
  }
  