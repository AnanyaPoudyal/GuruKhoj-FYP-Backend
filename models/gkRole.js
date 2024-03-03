const mongoose = require('mongoose');

const gkRoleSchema = mongoose.Schema({
    gkUserRole: String,
})

exports.GKRole =mongoose.model('GKRole', gkRoleSchema);
