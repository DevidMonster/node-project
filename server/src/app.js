import express from 'express';
import cors from 'cors';
import { createServer } from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser';
import connecting from './config/db';
import dotenv from 'dotenv';
import authRouter from './routes/auth'
import userRouter from './routes/user'
import postRouter from './routes/post'
import commentRouter from './routes/comment'

dotenv.config()
const app = express();
const httpRequest = createServer(app)
const io = new Server(httpRequest, {
    cors: "*"
})


io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('comment', (commentValue) => {
        io.of('/').emit('comment', {cmt: commentValue || '', message:"comment successfully"})
    })
})

app.use(cors({origin: true, credentials: true}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', commentRouter)

connecting()

httpRequest.listen(process.env.PORT, () => {
    console.log('Server listening on http://localhost:' + process.env.PORT)
})