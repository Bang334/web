const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    deleted: {
        type: Boolean,
        default: false
    },
    name: String,
    des: String,
    deletedAt: Date,
    permissions:{
        type:Array,
        default: [],
    }
}, {
    timestamps: true 
});

const role = mongoose.model('role', roleSchema, "roles");

module.exports = role
