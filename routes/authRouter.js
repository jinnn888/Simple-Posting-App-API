import express from 'express'
import {
     register,
     loginUser,
     getUsers
} from '../controllers/authController.js'
export const router = express.Router()

router.post('/register', register)
router.post('/login', loginUser)
router.get('/profile', getUsers)
