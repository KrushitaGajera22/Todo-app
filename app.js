var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();

//setting up the template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire the controller
todoController(app);

//listen to the port
app.listen(3000);
console.log('You are listening to port 3000');