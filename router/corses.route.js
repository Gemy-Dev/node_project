import { getCorses, addCorse, getCorseById, updateCorse, deleteCorse } from '../controllers/corses.controller.js'
import JWTtoken from '../utils/JWTtoken.js';
import { Router } from 'express'
import allowedTo from '../middleware/allowTo.js';
import UserRole from '../models/userRole.js';
const route=Router()

route.route('/')
     .get(getCorses)
     .post(addCorse);

route.route('/:id').get(getCorseById)
                    .patch(updateCorse)
                    .delete(JWTtoken.verifyToken,allowedTo(UserRole.User,UserRole.ADMIN), deleteCorse);
export default route;
