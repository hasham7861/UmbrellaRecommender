const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: String,
    personOfContact: String,
    telephoneNumber: String,
    city: String,
    numberOfEmployees: Number,
    shouldRecommendUmbrella: Boolean
})

module.exports = mongoose.model("customer", customerSchema)