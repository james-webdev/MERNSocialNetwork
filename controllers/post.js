const Post = require('../models/post');


exports.postsIndex = (req, res) => {
    
    const posts = Post.find()
    .select( "_id title body")
    .then(posts => {
        res.json({posts});
    })
    .catch(err => console.log(err))
    
};

exports.createPost = (req, res) => {

 const post = new Post(req.body);
 console.log('Creating Post', post);
 post.save((err, result) => {
     if(err){
         console.log(err);
     }
     res.status(200).json({
         post: result });
 })

};

