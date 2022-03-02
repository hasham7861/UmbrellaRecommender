const { validationResult } = require("express-validator")
const customerSchema = require("./customer.schema")
const fetch = require('node-fetch')
const config = require('../config/app.local.config')
const util = require('util')
module.exports = class CustomerController {

    static createCustomer(request, response) {

        const errors = validationResult(request);
        
        if(!errors.isEmpty()){
            return response.status(400).send({ message: "validation failed", errors: errors.array()})
        }

        const { name, personOfContact, telephoneNumber, location, numberOfEmployees } = request.body;

        customerSchema.create({
            name,
            personOfContact,
            telephoneNumber,
            location,
            numberOfEmployees
        }, function (err) {
            if (err) {
                response.status(400).send({ message: "unable to create customer", errors: err })
            } else {
                response.send({ message: "created a customer successfully" })
            }
        })
    }
    static updateCustomer(request, response) {
        
        const errors = validationResult(request);
        
        if(!errors.isEmpty()){
            return response.status(400).send({ message: "validation failed", errors: errors.array()})
        }

        const {id, data} = request.body;

        customerSchema.findOneAndUpdate({_id: id}, {$set:{...data}}, function(err){
            if(err){
                return response.status(400).send({message: 'unable to update customer', errors: err})
            }
            response.send({message: "customer updated successfully"})
        })
    }

    static deleteCustomer(request, response) {

        const errors = validationResult(request);
        
        if(!errors.isEmpty()){
            return response.status(400).send({ message: "validation failed", errors: errors.array()})
        }
        
        const {id} = request.body;

        customerSchema.findByIdAndDelete(id, function(err){
            if(err){
                return response.status(400).send({message: 'unable to delete customer', errors: err}) 
            }
            response.send({message: "successfully deleted customer"})
        })

    }

    static getCustomersWhoHaveRainAndNoRainGivenDays(request, response) {
        // TODO: from all the customers in database, use their location to get only 4 customers who have top employee companies who have rain and no rain
        const routeStringWithDynamicLatAndLon = util.format(config.externalApi.openWeather.uri,"51.5085","-0.1257");

        fetch(routeStringWithDynamicLatAndLon).then(async data=>{
           const resp= await data.text()
           const jsonResp = JSON.parse(resp)
           response.send(jsonResp)
        }
            
            ).catch(err=>{
            if(err){
                return response.status(400).send({message: "failed to make call to openweather", errors: err})
            }
        })
    }

}