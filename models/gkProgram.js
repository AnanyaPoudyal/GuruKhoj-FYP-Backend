const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const gkProgramSchema = mongoose.Schema({
    gkprogramArea: {
       type: String,
       required: true, 
    },
    gkprogramSubject: {
       type: String,
       required: true, 
    },
    gkprogramAddress: {
        type: String,
        required: true, 
     },
     gkprogramStartTime: {
        type: Date,
        default: Date.now, 
     },
     gkprogramEndTime: {
        type: Date,
        default: Date.now,
     },
     gkprogramPrice: {
        type: Number,
        required: true, 
     },
     gkprogramStudentCapacity: {
        type: String,
        required: true, 
     },
     gkprogramHomeTution: {
        type: Boolean,
        default: false,
    }
})

exports.GKProgram = mongoose.model('GKProgram', gkProgramSchema);