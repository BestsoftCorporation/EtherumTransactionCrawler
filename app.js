var path = require('path');
var methodOverride = require('method-override');
const express = require('express')
var app = module.exports = express();
const port = 3000
const mongoose = require('mongoose');
require('dotenv').config();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'));

require('./lib/boot')(app, { verbose: !module.parent });

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

if (!module.parent) {
    app.listen(4001);
    console.log('Express started on port 4001');
  }