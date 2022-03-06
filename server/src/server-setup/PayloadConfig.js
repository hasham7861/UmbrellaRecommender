const express = require('express')

module.exports = function getPayloadConfig(){
    return [
        express.urlencoded({extended: true}),
        express.json()
    ]
}