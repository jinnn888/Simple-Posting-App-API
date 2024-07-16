import Post from '../model/postModel.js'
//@desc        Add a post
//@route       /api/post

export const addPost = async(req, res) => {
     try {
       const newPost = await Post.create({
          author: req.user.id,
          post: req.body.post,
          image: req.body.image
     })
       return res.status(201).json({msg: 'uploaded', newPost})

  } catch(err) {
     return res.status(400).json({msg: 'something went wrong.', error: err})
}
}
export const getImage = async(req, res) => {
     try {
          const img = await Images.find()
          res.json(img)
     } catch(e) {
          // statements
          console.log(e);
     }
}

export const deletePost = async(req, res) => {
     try {

          const post = await Post.find({_id: req.params.id})
          if (!post) {
               return res.status(400).json({message: 'No post found.'})
          }
          const admin = req.user.email === process.env.EMAIL_ADMIN
          if (admin) {
               await Post.deleteOne({ _id: req.params.id})
          }
          if ((String(req.user.id) !== String(post[0].author) && !admin)) {
               return res.status(400).json({ error: 'Unauthorized' });
        }

        await Post.deleteOne({ _id: req.params.id})
        res.status(202).json({ message: 'Deleted' })
   } catch(err) {
     console.log(err)
     res.status(500).json({message: 'Server Error'});
}
}
export const getPost = async(req, res) => {
     try {
          const allPost = await Post.find()          
          return res.status(200).json({'all_post': allPost })
     }catch(err) {
          console.log(err)
          res.status(400).json({error: err, msg: 'Someting went wrong.'})
     }
}