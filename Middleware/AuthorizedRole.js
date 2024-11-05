
const AuthorizedRole = (...allowedRoles)=>{
    console.log(allowedRoles)
    return (req, res, next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({ message: "Access forbideen: Insufficient Permission!"})
        }
        next();
    }
}

module.exports = AuthorizedRole;