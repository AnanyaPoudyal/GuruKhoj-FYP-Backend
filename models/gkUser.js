const mongoose = require('mongoose');

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
    photo: {
        type: String,
        default: ''
    },
    gkrole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GKRole',
        required: true
    }
});


gkUserSchema.virtual('id').get(function () {
    return this._id.toHexString();
 });
 
 gkUserSchema.set('toJSON', {
    virtuals: true
 });


exports.GKUser = mongoose.model('GKUser', gkUserSchema);