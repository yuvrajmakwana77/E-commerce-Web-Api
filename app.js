const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./Helper/jwt')
const errorHandler = require('./Helper/error-handler');


app.use(cors());
app.options('*',cors());

// write all login requst to one file with morgan
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('tiny',{stream: accessLogStream}));

//middelware 
app.use(express.json());
app.use(authJwt());
app.use(errorHandler);
//app.use(bodyParser.json());
const { strict, fail } = require('assert');//for writing all log
const { create } = require('domain');// in access.log file
const { type } = require('os');//morgan 

//Routes
const productsRouter = require('./Routers/products');
const categoriesRoutes = require('./Routers/categories');
const usersRouters = require('./Routers/users');
const ordersRoutes =require('./Routers/orders');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRouters);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Connection Sucssesfull");
})
.catch((err)=>{
    console.log("Connection fail",err);
});

// app.get('/', (req, res) => {
//      res.send('Welcome to the homepage');
//  });

//server
app.listen(5000,() => {
    console.log("server is running on http://localhost:5000");
});
