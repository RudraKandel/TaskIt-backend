const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:  [true, 'Please add your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'please addd your last name'],
    },
    email: {
        type: String,
        required:  [true,'please enter you valid email'],
        unique : true
    },
    role_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },

    designation : {
        type: String,
        required: [true,'choose any one designation'],
        enum:[
            'FrontEnd',
            'Backend',
            'UI/UX Designer',
            'QA',
            'Full Stack Developer'
        ]
    },


    isEmailVerified :{
        type: Boolean,
        default: false,
    },
        
    user_name :{
        type: String,
        unique: true,
    },
    password : {
        type: String,
        required:true
    },
    
},{timestamps: true})

module.exports = mongoose.model('user', userSchema);