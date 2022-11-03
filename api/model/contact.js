const mongoose = require('mongoose')

contactSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    phone:Number,
    email:String,
})

module.exports = mongoose.model('Contact', contactSchema);