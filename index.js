import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from './createToken.js'
import { router as userRouter } from './routes/authRouter.js'
import { router as postRouter } from './routes/postRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
// Connect to DB
connectDB()

const app = express()
app.use(cors({
     origin: ['https://simple-posting-app-eosin.vercel.app'],
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Routes
app.use('/api', userRouter)
app.use('/api', postRouter)
const PORT = process.env.PORT

app.listen( PORT, () => {
     console.log(`Listening on PORT ${PORT}`)
})