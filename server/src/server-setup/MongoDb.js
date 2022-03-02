const mongoose = require('mongoose')
const config = require('../config/app.local.config')

const MONGO_CONNECTION_STATE = {
    DISCONNECTED: 0,
    CONNECTED: 1,
}

module.exports = class MongoClient {

    static setGlobalInstance(){
        if(mongoose.connection.readyState == MONGO_CONNECTION_STATE.DISCONNECTED){
            mongoose.connect(config.database.mongo.uri)
                .then(()=>console.log('Mongo connected'))
                .catch(err=> console.error({error_message: 'Mongo failed to connect error', trace: err}))
        }
 
    }
}
