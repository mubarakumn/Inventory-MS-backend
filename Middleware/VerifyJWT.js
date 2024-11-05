const jwt = require('jsonwebtoken');

const VerifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
          return  res.status(403).json({ message: 'Invalid token' });
        }
    req.user = decoded;
    next();
    })
};

module.exports = VerifyJWT;  
