const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: String,
    personOfContact: String,
    telephoneNumber: String,
    location: {lat: String, lon: String},
    numberOfEmployees: Number
})

module.exports = mongoose.model("customer", customerSchema)