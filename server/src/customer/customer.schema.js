const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: String,
    personOfContact: String,
    telephoneNumber: String,
    city: String,
    numberOfEmployees: Number
})

module.exports = mongoose.model("customer", customerSchema)