import express from 'express';
import { addPost, getAll, getOne, patchPost, removePost } from '../controller/post';

const route = express.Router()

route.get('/posts', getAll)
route.get('/posts/:id', getOne)
route.post('/posts', addPost)
route.patch('/posts/:id', patchPost)
route.delete('/posts/:id', removePost)

export default route