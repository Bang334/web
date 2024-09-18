const mongoose = require('mongoose');
const listGirl = mongoose.model('listGirl', 
    { 
        name: String,
        age: Number,
        image: String,
        job: String,
        price: Number,
        stock: Number,
        deleted:Boolean,
        status: String,
        discount: Number,
        des:String
    },"Girl");

module.exports = listGirl