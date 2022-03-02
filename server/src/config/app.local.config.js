module.exports = {
    database: {
        mongo: {
            uri: "mongodb://localhost:27017/umbrella-app"
        } 
    },
    listeningPort: 5000,
    externalApi:{
        openWeather: {
            uri: 'https://api.openweathermap.org/data/2.5/forecast?lat=%s&lon=%s&appid=0f03e0781245084b739ac21eb3bbaa30'
        }
    }
}