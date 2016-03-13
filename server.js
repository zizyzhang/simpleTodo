/**
 * Created by Zizy on 3/12/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database.js');
db.connect();
db.getTodo();

var app = express();
var arr ;

var todoList = [
    {id:0,status:0,content:'eat'},
    {id:1,status:1,content:'play'}
];


var maxId=1;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);//CORS middleware



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/del/todo/:id',function(req,res){
//splice


    res.json({success:delTodoById(req.paramas.id)});

 });


app.get('/del/allComplete',function(req,res){
//全刪
    delAllComplete();

    res.json({success:1});

});
app.post('/todo',function(req,res){
        var content = req.body.content;
        var status = req.body.status;

        maxId++;
        addTodo(maxId,content,status);
        res.json({success:1});

    }
);

app.get('/todo',function(req,res){
     // Pass to next layer of middleware
    res.json(getTodo());
});



app.listen(3000, function () {
    console.log('' +
        'app listening on port 3000!');
});


function getTodo(){
    return  todoList ;

}

function addTodo(id,content,status){
    todoList.push({id:id,content: content,status:status});
}

function delTodoById(id){
    var isSuccess=0;

    for(var index in todoList){
        if(todoList[index].id=id){
            todoList[index].status=-1;
            var isSuccess=1;

            break;
        }
    }

    return isSuccess;
}

function delAllComplete(){
    for(var index in todoList){
        if(todoList[index].status==1){
            todoList[index].status=-1;
        }
    }

 }