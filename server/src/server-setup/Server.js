const express = require('express');
const { listeningPort } = require('../config/app.local.config');
const customerRouter = require('../customer/customer.router');

const MongoClient = require('./MongoDb');

module.exports = class Server {
    
    static _instance = null;  
   
    static _create(){
        if(this._instance === null){
            this._instance = express();
            this._instance.use(express.urlencoded({extended: true}));
            this._instance.use(express.json()) 
        }

        return this._instance;
    }

    static start(){
        
        this._create();

        MongoClient.setGlobalInstance()

        customerRouter(this._instance)

        this._instance.listen(listeningPort,()=>{
            console.log('Server is listening for request on port:',  listeningPort)
        })
        
    }
}