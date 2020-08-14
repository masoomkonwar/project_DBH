const mongoose = require('mongoose')
const schema = mongoose.Schema
devSchema = new schema({
    email : String,
    password : String,
    firstname : String,
    lastname : String,
    level: Number,
    xp : Number,
    catagory : String

})

module.exports = mongoose.model('developer',devSchema,'developers')