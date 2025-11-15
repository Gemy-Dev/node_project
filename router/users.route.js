import { getAllUsers, login, register } from '../controllers/users.controller.js'
import JWTtoken from '../utils/JWTtoken.js'
import { Router } from 'express'
import fileUplaoder from '../utils/fileUplaoder.js'
const route=Router()

route.route('/')
     .get(JWTtoken.verifyToken,getAllUsers)
   

route.route('/login').post(login);
route.route('/register').post(fileUplaoder.single('avatar'), register);
                
export default route