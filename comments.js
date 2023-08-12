//Create web server

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to database
mongoose.connect(config.database);

//Set up static files
app.use(express.static(path.join(__dirname, 'public')));

//Set up routes
var apiRoutes = require('./routes/api')(app, express);
app.use('/api', apiRoutes);

//Start server
app.listen(port, function() {
  console.log('Listening on port ' + port);
});