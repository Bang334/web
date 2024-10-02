const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// Định nghĩa schema cho listGirl
const listGirlSchema = new mongoose.Schema({
    name: String,
    age: Number,
    image: String,
    job: String,
    price: Number,
    slug: { type: String, slug: "name", unique:true },
    stock: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    },
    discount: Number,
    des: String,
    deletedAt: Date,
    position: Number
}, {
    timestamps: true 
});

const listGirl = mongoose.model('listGirl', listGirlSchema, "Girl");

module.exports = listGirl
