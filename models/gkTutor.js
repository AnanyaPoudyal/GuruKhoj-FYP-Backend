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
})


exports.GKTutor = mongoose.model('GKTutor', gkTutorSchema);