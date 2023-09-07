require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const socketIo  = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const options = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(process.env.MONGODB_URL, options);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is connected');
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection has occured ' + error + 'error');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log('Mongoose connection is disconnected due to apllication termination');
    });
});


app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000/");
});

const useRoute = require('./routes/index');
app.use(useRoute);


