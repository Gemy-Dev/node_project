import User from '../models/users.model.js';
import status from '../utils/httpText.status.js';
import asyncWrapper from '../middleware/asyncWrapper.js'
import appErrors from '../utils/appErrors.js';
import bcrypt from 'bcrypt'
import JWTtoken from '../utils/JWTtoken.js';
const getAllUsers=asyncWrapper( async (req,res)=>{
  const limit=req.query.limit||10;
  const page=req.query.page||1;
  const skip=(page-1)*limit;
    const users=await User.find({},{"__v":false}).limit(limit).skip(skip);
    res.json(new status.Success({users}));
});
const login= asyncWrapper(async(req,res,next)=>{
    const {email,password}=req.body;
 let user=await User.findOne({email})
    if(!user){
        const error =appErrors.create(404,"Fail","User not found")
      return  next(error)
    }
    if(!bcrypt.compareSync(password,user.password) ){
                const error =appErrors.create(401,"Fail","Invalid credentials")

              return  next(error)

    }
    const token=JWTtoken.token({id:user._id,email:user.email,role:user.role})

    const data={...user.toJSON(),token}
    res.status(200).json(new status.Success(data))
});

const register= asyncWrapper(async(req,res,next)=>{
    const {firstName,lastName,email,password,role}=req.body;
    console.log(req.file)
    console.log(req.body);
  const oldUser = await User.findOne({ email });
    if(oldUser){
        const error =appErrors.create(400,"Fail","This user is Exist")
      return  next(error)
    }
    const salt = bcrypt.genSaltSync(10);

    const hashedPass= bcrypt.hashSync(password,salt)
      const token=JWTtoken.token({email:email,role:role})
 
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password:hashedPass,
    role,
    avatar:req.file.filename
  });

  res.status(201).json(new status.Success({...newUser.toJSON(),token:token}));



})


export  {
    getAllUsers,
    login,
    register
}




