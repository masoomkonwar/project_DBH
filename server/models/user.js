const mongoose = require('mongoose')
const schema = mongoose.Schema
userSchema = new schema({
    email : String,
    password : String,
    firstname : String,
    lastname : String
})

module.exports = mongoose.model('user',userSchema,'users')