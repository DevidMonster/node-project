import express from 'express';
import { create, getAll, patchPost, getOne, deletePost, removePost, trash, restorePost } from '../controller/post';
import { authenticattion } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';


const router = express.Router()

router.get('/posts', getAll)
router.get('/posts-trash', trash)
router.get('/posts/:slug', getOne)
router.get('/post/:id', getOne)
router.post('/posts', authenticattion, authorization, create)
router.patch('/posts/:id', authenticattion, authorization, patchPost)
router.patch('/posts/:id/restore', authenticattion, authorization, restorePost)
router.patch('/posts/:id/del', authenticattion, authorization, removePost)
router.delete('/posts/:id', authenticattion, authorization, deletePost)

export default router