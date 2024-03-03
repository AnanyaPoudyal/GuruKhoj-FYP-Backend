const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const gkAdmitSchema = new mongoose.Schema({
    gkstatus: {
        type: String, 
        required: true,
    },
    gkuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GKUser',
        required: true
    },
    gkprogram: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GKProgram',
        required: true
    }
})

exports.GKAdmit = mongoose.model('GKAdmit', gkAdmitSchema);