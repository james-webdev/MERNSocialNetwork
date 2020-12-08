const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({


    title: {
        
        type: String,
        required: 'title is required'
        
    },

    body: {

        type: String,
        required: 'title is required'
    }

}

)

module.exports = mongoose.model('Post', postSchema);