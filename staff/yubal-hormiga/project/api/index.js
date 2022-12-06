require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const authenticateUserHandler = require('./handlers/authenticateUserHandler')
const registerUserHandler = require('./handlers/registerUserHandler')
const retrieveUserHandler = require('./handlers/retrieveUserHandler')
const createAppointmentHandler = require('./handlers/createAppointmentHandler')
const retrieveAppointmentHandler = require('./handlers/retrieveAppointmentHandler')
const updateAppointmentHandler = require('./handlers/updateAppointmentHandler')

const deleteAppointmentHandler = require('./handlers/deleteAppointmentHandler')


const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')
const jwtVerifier = require('./utils/jwtVerifier')

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`db connected to ${MONGODB_URL}`)

        const api = express()

        api.use(cors)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/users', jsonBodyParser, registerUserHandler)
        api.get('/users', jwtVerifier, retrieveUserHandler)
        api.post('/appointment', jwtVerifier, jsonBodyParser, createAppointmentHandler)
        api.get('/appointment/:appointmentId', jwtVerifier, retrieveAppointmentHandler)
        api.patch('/appointment/:appointmentId', jwtVerifier, jsonBodyParser, updateAppointmentHandler)

        api.delete('/appointment/:appointmentId', jwtVerifier, deleteAppointmentHandler)

        const { PORT } = process.env

        api.listen(PORT, () => console.log(`server listening on port ${PORT}`))
    })
    .catch(error => console.error(error))