import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
     author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
     },
     post: {
          type: String,
          required: true
     },
     image: {
          type: String
     },
     createdAt: {
          type: Date,
          default: Date.now
     }

})
export default mongoose.model('Post', postSchema)