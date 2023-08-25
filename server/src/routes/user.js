import express from 'express';
import { createUser, fetchOne, getAllUsers, updateUser } from '../controller/user';
import { authenticattion } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';


const router = express.Router()

router.get('/user', authenticattion, authorization,getAllUsers)
router.get('/user/:id', authenticattion, authorization, fetchOne)
router.post('/user', authenticattion, authorization, createUser)
router.patch('/user/:id', authenticattion, authorization, updateUser)

export default router