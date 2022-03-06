const cors = require('cors')

module.exports = function getCorsConfig(){
    const corsOption = {
        origin: 'http://localhost:3000',
        optionSuccessStatus: 200
    }

    return cors(corsOption)
}