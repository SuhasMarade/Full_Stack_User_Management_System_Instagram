const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectionToDB = require('./config/databaseConfig');
const userRouter = require('./router/userRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}))

connectionToDB();

app.use('/',userRouter)

module.exports = app;
