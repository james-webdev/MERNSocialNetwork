const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({


    title: {
        
        type: String,
        required: 'title is required'
        
    },

    body: {

        type: String,
        required: 'title is required'
   
    },

    photo: {
       
        data: Buffer,
        contentType: String

    },

    postedBy: {

        type: ObjectId,
        ref: 'User'

    },

    created: {

        type: Date,
        default: Date.now
        
    }

}

)

module.exports = mongoose.model('Post', postSchema);