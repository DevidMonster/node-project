import express from 'express';
import { create, fetchByPostId, getAll, removeComment } from '../controller/comment';
import { authenticattion } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';

const router = express.Router()

router.get('/comment', getAll)
router.get('/comment/post/:id', fetchByPostId)
router.post('/comment', create)
router.delete('/comment/:id', authenticattion, authorization, removeComment)

export default router