const mongoose = require('mongoose');

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

gkAdmitSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

gkAdmitSchema.set('toJSON', {
    virtuals: true
});

exports.GKAdmit = mongoose.model('GKAdmit', gkAdmitSchema);