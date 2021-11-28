var path = require('path');
var methodOverride = require('method-override');
const express = require('express')
var app = module.exports = express();
const port = 3000

require('dotenv').config();


// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'));

require('./lib/boot')(app, { verbose: !module.parent });


/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
  }