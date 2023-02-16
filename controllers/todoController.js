var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.set('strictQuery', true);
// Connect to the database
mongoose.connect('mongodb+srv://testtodo:khushi@todo.vcuruvj.mongodb.net/?retryWrites=true&w=majority');

//create schema 
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/* it always adds an item when we start an application
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});
*/

//var data = [{item : 'get milk'}, {item: 'wash clothes'}, {item: 'do homework'}];     dummy data
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
    // get data from mondodb and pass it to view
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedParser, function(req, res){
    // get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res){
    // delete the requested item from mongodb
    Todo.find({item: req.params.item}).deleteOne(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

}