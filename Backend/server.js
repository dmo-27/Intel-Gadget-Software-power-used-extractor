const express = require ("express");
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = require('./config/db');
const cors = require("cors");









const port = process.env.PORT || 5000

const app= express();

const { errorHandler } = require("./middlewares/errorMiddleware.js");



connectDB();


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  cors(
    origin:["https://deploy-mern-intelgidea.vercel.app"];
    methods:["POST","GET"];
    credentials:true
  )
);

app.use('/uploadcsv', require('./routes/csvRouter'));
app.use('/acc',require('./routes/accRouter'));
app.use('/power',require('./routes/powerRouter'));
app.use('/display',require('./routes/displayRouter'));

app.use(errorHandler);

app.listen(port, () => console.log( "http://localhost:"+`${port}`));
