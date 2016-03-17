/**
 * Created by Zizy on 3/12/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database.js');
db.connect(function(err){
    if(!err){
        initMaxId();
    }
});

//db.getTodo();
//updateTodo('2');


var app = express();
//var arr ;

var todoList = [
    {id: 0, status: 0, content: 'eat'},
    {id: 1, status: 1, content: 'play'}
];


var maxId;


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);//CORS middleware


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/del/todo/:id', function (req, res) {
//splice


    delTodoById(res,req.params.id);

});


app.get('/del/allComplete', function (req, res) {
//全刪
    delAllComplete(res);


});
app.post('/todo', function (req, res) {
        var content = req.body.content;
        var status = req.body.status;

        maxId++;
         addTodo(res, maxId, content, status);

    }
);

 app.get('/todo', function (req, res) {
    // Pass to next layer of middleware
    getTodo(res);
});

app.get('/update/todo/:id', function (req, res) {
    // Pass to next layer of middleware
    console.log("server id : " + req.params.id);

    updateTodo(res,req.params.id);
 });


app.listen(3000, function () {
    console.log('' +
        'app listening on port 3000!');
});


function updateTodo(res,id) {
    db.updateTodo(id, function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }

    });
}


function getTodo(res) {
    db.getTodo(function (err, todoList) {


        if (err) {
            console.log(JSON.stringify(err));
            res.json({success: 0});
        }
        else {
            res.json(todoList);
        }


    });

}

function addTodo(res,id, content, status) {
    db.addTodo(id, content, status, function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }

    });
}


function delTodoById(res,id) {
    db.delTodoById(id, function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }
    });

}

function delAllComplete(res) {
    db.delAllComplete(function (err) {
        if (err) {
            res.json({success: 0});
        }
        else {
            res.json({success: 1});
        }
    });
}

function initMaxId() {
    db.getMaxId(function(err,row){
        if(!err){
            maxId = row.max;
        }
    });
}