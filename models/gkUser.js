const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const gkUserSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true,
    },
    last_name: {
        type: String, 
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String, 
        required: true,
    },
    contact_number: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    gkrole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GKRole',
        required: true
    }
});


exports.GKUser = mongoose.model('GKUser', gkUserSchema);