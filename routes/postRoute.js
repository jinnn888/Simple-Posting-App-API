import express from 'express'
import {
     addPost,
     deletePost,
     getPost
} from '../controllers/postController.js'
import { auth } from '../middleware/auth.js'
export const router = express.Router()

router.post('/post', auth,  addPost)
router.delete('/post/:id', auth, deletePost)
router.get('/post', getPost)
