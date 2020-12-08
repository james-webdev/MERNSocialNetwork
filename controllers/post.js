const Post = require('../models/post');


exports.getPosts = (req, res) => {
    res.json({
                posts:
                [ 
                    { title: 'first post'},
                    { title: 'first title'}
                ]
             })
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

