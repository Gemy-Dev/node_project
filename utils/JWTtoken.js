import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';
import httpTextStatus from "./httpText.status.js";


dotenv.config();
const jwt_secret=process.env.JWT_SECRET;
const expiration_time=process.env.JWT_EXPIRATION_TIME;

function token(payload){
    return jsonwebtoken.sign(payload,jwt_secret,{expiresIn:expiration_time})
}
function verifyToken(req,res,next){
  const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json(new httpTextStatus.Error('this token is invalid or not auth'))
        try {
    const  current=jsonwebtoken.verify(token,jwt_secret);
    req.current=current;
    console.log(current)
            next();
        } catch (error) {
            console.log(error);
            res.status(403).json(new httpTextStatus.Error('Invalid or expired token'))
        }
}


export default {token,verifyToken}