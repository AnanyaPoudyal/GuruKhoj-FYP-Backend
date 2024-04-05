const mongoose = require('mongoose');

const gkRoleSchema = mongoose.Schema({
    gkUserRole: String,
})

gkRoleSchema.virtual('id').get(function () {
    return this._id.toHexString();
 });
 
 gkRoleSchema.set('toJSON', {
    virtuals: true
 });
exports.GKRole =mongoose.model('GKRole', gkRoleSchema);
