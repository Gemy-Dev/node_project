import appErrors from "../utils/appErrors.js"

const allowedTo=(...roles)=>{
    return (req,res,next)=>{
        console.log(req.current.role)
if(!roles.includes(req.current.role)){
    return next(appErrors.create(401,"Error","you are not allowed"));
}
next()
    }
}

export default allowedTo;