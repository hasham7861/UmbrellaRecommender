const CustomerController = require("./customer.controller")
const { body } = require('express-validator')


const validator = (routeName) =>{
    switch(routeName){
        case 'createCustomer': 
            return [
                body('name', 'name is missing').exists(),
                body("personOfContact", 'personOfContact is missing').exists(),
                body('city', 'city is missing').exists(),
                body("telephoneNumber", 'telephoneNumber is missing').exists(),
                body("numberOfEmployees", 'numberOfEmployees is missing').exists()
            ]
        case 'updateCustomer':
            return [
                body('id', 'id is missing').exists(),
                body('data', 'data is missing or not in object').isObject(),
            ]
        case 'deleteCustomer':
            return [
                body('id', 'id is missing').exists()
            ]
        default:
            return;
    }
}
module.exports = function(serverInstance){

    serverInstance.get("/customer/top", CustomerController.getCustomersWhoHaveRainAndNoRainGivenDays)

    serverInstance.post("/customer/create", validator('createCustomer'), CustomerController.createCustomer)

    serverInstance.put("/customer/update", validator('updateCustomer'), CustomerController.updateCustomer)

    serverInstance.delete("/customer/delete", validator('deleteCustomer'), CustomerController.deleteCustomer)
}