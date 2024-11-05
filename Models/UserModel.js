const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
        lowercase: true, 
        trim: true, 
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'staff'],
        default: 'staff'
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserScheme)

module.exports = UserModel