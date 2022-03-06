const { validationResult } = require("express-validator")
const customerSchema = require("./customer.schema")
const fetch = require('node-fetch')
const config = require('../config/app.local.config')
const util = require('util')
const _ = require('lodash')
module.exports = class CustomerController {

    static createCustomer(request, response) {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).send({ message: "validation failed", errors: errors.array() })
        }

        const { name, personOfContact, telephoneNumber, city, numberOfEmployees } = request.body;

        customerSchema.create({
            name,
            personOfContact,
            telephoneNumber,
            city,
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

        if (!errors.isEmpty()) {
            return response.status(400).send({ message: "validation failed", errors: errors.array() })
        }

        const { id, data } = request.body;

        customerSchema.findOneAndUpdate({ _id: id }, { $set: { ...data } }, function (err) {
            if (err) {
                return response.status(400).send({ message: 'unable to update customer', errors: err })
            }
            response.send({ message: "customer updated successfully" })
        })
    }

    static deleteCustomer(request, response) {

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).send({ message: "validation failed", errors: errors.array() })
        }

        const { id } = request.body;

        customerSchema.findByIdAndDelete(id, function (err) {
            if (err) {
                return response.status(400).send({ message: 'unable to delete customer', errors: err })
            }
            response.send({ message: "successfully deleted customer" })
        })

    }

    static async getCustomersWhoHaveRainAndNoRainGivenDays(request, response) {

        const customers = await customerSchema.find({})
        
        const top4Customers = get4CustomersWithHighestEmployeeCount(customers);

        const willTheseCustomersFaceRain = await Promise.all(top4Customers.map(
            async customer=>{
                return {
                    name: customer.name,
                    shouldRecommendUmbrella: await shouldRecommendUmbrella(customer.city),
                    numberOfEmployees: customer.numberOfEmployees
                }
            }
        ))

        return response.send(willTheseCustomersFaceRain)

        function get4CustomersWithHighestEmployeeCount(customers){
            const sortedByTopEmployeeCount = customers.sort((a,b)=>b.numberOfEmployees - a.numberOfEmployees)
            return sortedByTopEmployeeCount.slice(0,4)
        }

        async function shouldRecommendUmbrella(cityName){

            const {lat, lon} = await getGeoCoordinatesBasedOnCityName(cityName)

            const strParams = 'data/2.5/forecast?lat=%s&lon=%s&units=%s&appId=%s';
            const routeStringWithDynamicLatAndLon = util.format(
                config.externalApi.openWeather.uri + strParams,
                lat, lon, 'metric', config.externalApi.openWeather.appId);

            let shouldRecommendUmbrella = false;
            try{
                const data = await fetch(routeStringWithDynamicLatAndLon)
                const resp = await data.text()
                const jsonResp = JSON.parse(resp)
                const filteredResp = filterRespWithWeatherAndTime(jsonResp)
                shouldRecommendUmbrella = isRainingOnAllNext5Days(filteredResp)
            } catch (error){
                shouldRecommendUmbrella = false;
                console.error('cant get should recommend umbrella flag for city:' + cityName)
            }

            return shouldRecommendUmbrella;
        }

        async function getGeoCoordinatesBasedOnCityName(cityName) {
            const strParams = 'geo/1.0/direct?q=`%s`&limit=1&appId=%s';
            const cityCoordinatesRequestUrl = util.format(
                config.externalApi.openWeather.uri + strParams, cityName, config.externalApi.openWeather.appId);

            let coordinates;

            try{
                const data = await fetch(cityCoordinatesRequestUrl)
                const resp = await data.text()
                const jsonResp = JSON.parse(resp)
                const { lat, lon } = _.get(jsonResp,'0',{})
                coordinates = {
                    lat,
                    lon
                }
            } catch (error){
                console.error('CUSTOMER_ERROR: cant get coordinates for city')
            }
         
            return coordinates;

        }

        function filterRespWithWeatherAndTime(resp) {
            return resp.list.map(element => {
                const weather = element.weather[0].main;
                const date = new Date(element.dt_txt)
                const dateStr = date.getDate() + "/" + (date.getMonth() + 1) +"/" + date.getFullYear()
                return {
                  weather, date: dateStr
                }
            })
        }

        function isRainingOnAllNext5Days(resp) {
            const rainCheckMap = new Map();

            resp.forEach(element=>{
                if(!rainCheckMap[element.date] && element.weather === "Rain"){
                    rainCheckMap[element.date] = true;
                }
            })

            
            const answer =  Object.entries(rainCheckMap).every((item)=> item[1] === true)
                 && Object.entries(rainCheckMap).length >= 5;
        
            return answer;
        }
    }
}