const jwt = require("jsonwebtoken")
const JWTSEC = "#2@!@$ndja45883 r7##";

const verifyToken = (req, res, next)=>{

    const authHeader = req.headers.token
   //console.log(req.accessToken)
    if(authHeader){
        let token = authHeader
        jwt.verify(token,  JWTSEC,(err, user)=>{
            if(err) return res.status(400).json('error occured')
            req.user = user
            next()
        })
    }else{
        return res.status(400).json('Access token is not vaild')
    }

}
module.exports = {verifyToken}