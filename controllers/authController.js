import User from '../model/userModel.js'
import Post from '../model/postModel.js'
import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from '../createToken.js'
import jwt from 'jsonwebtoken'

// Register controller
export const register = async(req, res) => {
     try {
          const body = req.body

          const exists = await User.findOne({ email: body.email })
          if ( !body.name || !body.password  || !body.email ) {
               return res.status(400).json({error: 'Please fill in the fields.'})
          }
          if (exists) {
               return res.status(400).json({ error: 'User already exist.'})          
          }
          if  (!validator.isEmail(body.email)) {
               return res.status(400).json({ error: 'Enter a valid email address.'})
          }
      //     if  (!validator.isStrongPassword(req.body.password)) {
      //      return res.status(400).json({ error: 'Enter a stronger password.'})
      // }
          const { name, email, password } = req.body;
     // Hash PassWord
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({ 
               name,
               email,
               password: hashedPassword,
          })
          return res.status(201).json(
               { msg: 'User created', id: newUser._id})
     } catch(err) {
          if (err instanceof Error) {
               res.status(400)
               .json({
                    status: '400 Bad request',
                    message: err.message
               })

          } else {
               res.status(500)
               .json( {
                    status: 'Internal server error',
                    message: '500 Internal server error, User not created.'
               } )
          }
     }
}
// Log in
export const loginUser = async(req, res) => {
     try{
          const loggedInUser = await User.findOne({email: req.body.email})
          if (!loggedInUser) {
               res.status(400)
               .json({ error: 'Email (user) not found.' })
               return
          }
          const validatePassword = await bcrypt.compare(req.body.password, loggedInUser.password)

          if (!validatePassword) { 
               res.status(400)
               .json({
                    error: 'Invalid password.',
                    status: '404: Bad request'
               })
               return
          }
          const userPost = await Post.find({ author: loggedInUser._id })
          const uniquePostIds = [...new Set(userPost.map(post => post._id.toString()))];
          const updated = await User.findByIdAndUpdate({ _id: loggedInUser._id }, {
               posts: uniquePostIds
          }, { new: true })

          const token = createToken(loggedInUser._id);
          res.status(200).json({ 
               _id: loggedInUser._id,
               posts: loggedInUser.posts,
               token: token
          })
     }catch(err) {
          console.log(err)
          res.status(500)
          .json({
               status: '500 Internal server error',
               message: '500 Internal server error, User is not logged in'
          })    
     }
}

export const getUsers = async(req, res) => {
     try{ 
          const users = await User.find({})
          return res.status(200).json(users)
     }catch(err) {
          res.status(400).json({ error: err })
     }    
}
