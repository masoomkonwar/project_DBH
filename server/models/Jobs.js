const mongoose = require('mongoose')
const schema = mongoose.Schema
jobSchema = new schema({
    jobtype : String,
    jobdesc : String
})

module.exports = mongoose.model('Job',jobSchema,'jobs')