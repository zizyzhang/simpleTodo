/**
 * Created by Zizy on 3/12/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
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

    var isSuccess=0;
    for(var index in todoList){
        if(todoList[index].id==req.paramas.id){
             todoList[index].status=-1;
            var isSuccess=1;

            break;
        }
    }

    res.json({success:isSuccess});

 });


app.get('/del/allComplete',function(req,res){
//全刪
     for(var index in todoList){
        if(todoList[index].status==1){
            todoList[index].status=-1;
         }
    }

    res.json({success:1});

});
app.post('/todo',function(req,res){
        var content = req.body.content;
        var status = req.body.status;

        maxId++;
        todoList.push({id:maxId,status:status,content: content});
         res.json({success:1});

    }
);

app.get('/todo',function(req,res){

    console.log(todoList);
     // Pass to next layer of middleware
    res.json(todoList);
});

app.get('/update/todo/:todoid',function(req,res){
    console.log("In server's"+req.paramas.id);
});


app.listen(3000, function () {
    console.log('' +
        'app listening on port 3000!');
});