const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// Định nghĩa schema cho info
const info = new mongoose.Schema({
    name: String,
    parent:{
        type:String,
        default:"",
    },
    status: {
        type: String,
        default: "active"
    },
    image: String,
    slug: { type: String, slug: "name", unique:true },
    stock: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    des: String,
    deletedAt: Date,
    position: Number
}, {
    timestamps: true 
});

const infoGirl = mongoose.model('infoGirl', info, "info");

module.exports = infoGirl
