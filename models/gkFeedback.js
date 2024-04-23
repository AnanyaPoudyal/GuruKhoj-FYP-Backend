const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const gkFeedbackSchema = new mongoose.Schema({
    feedback: {
        type: String, 
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    gkuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GKUser',
        required: true
    }
})

gkFeedbackSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

gkFeedbackSchema.set('toJSON', {
    virtuals: true
});

exports.GKFeedback = mongoose.model('GKFeedback', gkFeedbackSchema);