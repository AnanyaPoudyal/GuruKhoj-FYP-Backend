const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


const gkTutorSchema = new mongoose.Schema({
    instiuteName :  {
        type: String, 
        required: true,
    },
    degree : {
        type: String, 
        required: true,
    },
    area :  {
        type: String, 
        required: true,
    },
    gpa : {
        type: Number, 
        required: true,
    },
    graduatedDate : {
        type: Date,
        default: Date.now, 
     },
     gkuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GKUser',
        required: true
    }
})

gkTutorSchema.virtual('id').get(function () {
    return this._id.toHexString();
 });
 
 gkTutorSchema.set('toJSON', {
    virtuals: true
 });

exports.GKTutor = mongoose.model('GKTutor', gkTutorSchema);