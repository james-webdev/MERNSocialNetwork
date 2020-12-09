const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({


    name: {
        
        type: String,
        required: 'name is required'
        
    },

    email: {

        type: String,
        required: 'title is required'
    },

    password: {

        type: String,
        required: 'title is required'
    }



}

)

module.exports = mongoose.model('User', userSchema);